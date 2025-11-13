import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://travel-fs116-teamproject-backend.onrender.com';

if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');

/**
 * Client-side API instance
 */
export const api = axios.create({

  baseURL: '/api', // Next.js API routes

  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ======= REFRESH LOGIC =======

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// ======= INTERCEPTORS =======

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      _isInitialization?: boolean;
    };

    // Не пытаемся обновить токен на этих маршрутах
    if (
      originalRequest?.url?.includes('/auth/refresh') ||
      originalRequest?.url?.includes('/auth/register') ||
      originalRequest?.url?.includes('/auth/login')
    ) {
      return Promise.reject(error);
    }

    if (typeof window !== 'undefined') {
      const isAuthPage = window.location.pathname.startsWith('/auth/');
      if (isAuthPage) return Promise.reject(error);
    }

    // ==== 401 → попытка refresh ====
    if (error.response?.status === 401 && !originalRequest._retry) {
      const data = error.response.data as {
        message?: string;
        error?: string;
        response?: { message?: string; data?: { message?: string } };
      };

      const message =
        data?.message ||
        data?.error ||
        data?.response?.message ||
        data?.response?.data?.message ||
        '';

      const missingToken =
        message.includes('Authorization token is missing') ||
        message.includes('token is missing') ||
        message.includes('Session not found');


      // If tokens are completely missing (not just expired), don't try to refresh
      if (isMissingToken) {
        return Promise.reject(error);
      }
      const isGetMeRequest = originalRequest?.url?.includes('/users/me');
      if (isGetMeRequest) {
        return Promise.reject(error);
      }


      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post('/auth/refresh', {});
        processQueue(null, null);
        return api(originalRequest);
      } catch (refreshError) {
        const errData = (refreshError as AxiosError)?.response?.data as
          | { message?: string; error?: string }
          | undefined;

        const msg = errData?.message || errData?.error || '';
        const missingRefresh =
          msg.includes('Refresh token or session ID missing') ||
          msg.includes('token is missing');

        processQueue(refreshError, null);
        if (missingRefresh) return Promise.reject(error);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);