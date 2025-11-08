// import { LoginRequest, RegisterRequest } from '@/types/auth';
// import { api } from './api';
// import { User, AuthResponse } from '@/types/user';
// import { AxiosError } from 'axios';

// export const login = async (credentials: LoginRequest): Promise<User> => {
//   try {
//     const response = await api.post<AuthResponse>('/auth/login', credentials);
//     return response.data.user;
//   } catch (error) {
//     const axiosError = error as AxiosError<{ error: string }>;
//     throw new Error(axiosError.response?.data?.error || 'Failed to login');
//   }
// };

// export const register = async (userData: RegisterRequest): Promise<User> => {
//   try {
//     const response = await api.post<AuthResponse>('/auth/register', userData);
//     return response.data.user;
//   } catch (error) {
//     const axiosError = error as AxiosError<{ error: string }>;
//     throw new Error(axiosError.response?.data?.error || 'Failed to register');
//   }
// };

// export const logout = async (): Promise<void> => {
//   try {
//     await api.post('/auth/logout');
//   } catch (error) {
//     const axiosError = error as AxiosError<{ error: string }>;
//     throw new Error(axiosError.response?.data?.error || 'Failed to logout');
//   }
// };

// export const refreshToken = async (): Promise<void> => {
//   try {
//     await api.post('/auth/refresh');
//   } catch (error) {
//     const axiosError = error as AxiosError<{ error: string }>;
//     throw new Error(
//       axiosError.response?.data?.error || 'Failed to refresh token'
//     );
//   }
// };

// export const checkSession = async (): Promise<boolean> => {
//   try {
//     await api.get('/users');
//     return true;
//   } catch (error) {
//     const axiosError = error as AxiosError;

//     if (axiosError.response?.status === 401) {
//       return false;
//     }

//     console.error('Session check failed:', error);
//     return false;
//   }
// };

import { api } from './api';
import { User, AuthResponse } from '@/types/user';
import { LoginRequest, RegisterRequest } from '@/types/auth';
import { AxiosError } from 'axios';

// MOCK MODE - для тестування без бекенду
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

// Mock user для тестування
const MOCK_USER: User = {
  id: '1',
  email: 'test@test.com',
  name: 'Тест Тестович',
  avatar: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Login user
 */
export const login = async (credentials: LoginRequest): Promise<User> => {
  // MOCK MODE
  if (USE_MOCK_API) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Імітація затримки

    // Перевірка mock credentials
    if (
      credentials.email === 'test@test.com' &&
      credentials.password === 'Test123456'
    ) {
      localStorage.setItem('current-user', JSON.stringify(MOCK_USER));
      return MOCK_USER;
    } else {
      throw new Error('Невірний email або пароль');
    }
  }

  // REAL API
  try {
    const response = await api.post<AuthResponse>('/auth/login', credentials);

    if (typeof window !== 'undefined') {
      localStorage.setItem('current-user', JSON.stringify(response.data.user));
    }

    return response.data.user;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    throw new Error(
      axiosError.response?.data?.error || 'Помилка входу. Перевірте дані.'
    );
  }
};

/**
 * Register new user
 */
export const register = async (userData: RegisterRequest): Promise<User> => {
  // MOCK MODE
  if (USE_MOCK_API) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser = {
      ...MOCK_USER,
      email: userData.email,
      name: userData.name,
    };

    localStorage.setItem('current-user', JSON.stringify(newUser));
    return newUser;
  }

  // REAL API
  try {
    const response = await api.post<AuthResponse>('/auth/register', userData);

    if (typeof window !== 'undefined') {
      localStorage.setItem('current-user', JSON.stringify(response.data.user));
    }

    return response.data.user;
  } catch (error) {
    const axiosError = error as AxiosError<{ error: string }>;
    throw new Error(
      axiosError.response?.data?.error ||
        'Помилка реєстрації. Спробуйте ще раз.'
    );
  }
};

/**
 * Check session
 */
export const checkSession = async (): Promise<boolean> => {
  // MOCK MODE
  if (USE_MOCK_API) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = localStorage.getItem('current-user');
    return !!user;
  }

  // REAL API
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

// ... rest remains the same

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
