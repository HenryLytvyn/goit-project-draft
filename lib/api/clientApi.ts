import { LoginRequest, RegisterRequest } from '@/types/auth';
import { api } from './api';
import { User, AuthResponse } from '@/types/user';
import { AxiosError } from 'axios';

export const login = async (credentials: LoginRequest): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data.user;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    throw new Error(axiosError.response?.data?.error || 'Failed to login');
  }
};

export const register = async (userData: RegisterRequest): Promise<User> => {
  try {
    const response = await api.post<AuthResponse>('/auth/register', userData);
    return response.data.user;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    throw new Error(axiosError.response?.data?.error || 'Failed to register');
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    throw new Error(axiosError.response?.data?.error || 'Failed to logout');
  }
};

export const refreshToken = async (): Promise<void> => {
  try {
    await api.post('/auth/refresh');
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    throw new Error(
      axiosError.response?.data?.error || 'Failed to refresh token'
    );
  }
};

export const checkSession = async (): Promise<boolean> => {
  try {
    await api.get('/users');
    return true;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      return false;
    }

    console.error('Session check failed:', error);
    return false;
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const response = await api.get<AuthResponse>('/auth/me');
    return response.data.user;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;

    if (axiosError.response?.status === 404) {
      const storedUser = localStorage.getItem('current-user');
      if (storedUser) {
        return JSON.parse(storedUser) as User;
      }
      throw new Error('User not found in session');
    }

    throw new Error(
      axiosError.response?.data?.error || 'Failed to fetch user data'
    );
  }
};
