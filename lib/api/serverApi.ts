// lib/api/serverApi.ts
import axios, { AxiosError } from 'axios';
import type { User } from '@/types/user';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') + '/api';
if (!BASE_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export interface GetUsersServerResponse {
  data: {
    data: User[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  status: number;
  message: string;
}

export interface GetUserByIdServerResponse {
  status: number;
  message: string;
  data: {
    user: User;
    articles: {
      _id: string;
      title: string;
      img: string;
      date: string;
      favoriteCount: number;
    }[];
    totalArticles: number;
  };
}

export async function getUsersServer(
  page = 1,
  perPage = 4
): Promise<GetUsersServerResponse> {
  try {
    const res = await api.get<GetUsersServerResponse>('/users', {
      params: { page, perPage },
    });
    return res.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error('[getUsersServer error]', axiosError.message);
    throw new Error(
      axiosError.response?.data?.error || 'Failed to fetch users from server'
    );
  }
}

export async function getUserByIdServer(
  userId: string
): Promise<GetUserByIdServerResponse> {
  try {
    const res = await api.get<GetUserByIdServerResponse>(`/users/${userId}`);
    return res.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ error: string }>;
    console.error('[getUserByIdServer error]', axiosError.message);
    throw new Error(
      axiosError.response?.data?.error ||
        'Failed to fetch user by ID from server'
    );
  }
}
