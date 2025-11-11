//app/api/api.ts

import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError<{ error: string }>;

const baseURL = (() => {
  const raw = process.env.NEXT_PUBLIC_API_URL || '';
  const clean = raw.replace(/\/$/, '');
  return clean.endsWith('/api') ? clean : `${clean}/api`;
})();

export const api = axios.create({
  baseURL,
  withCredentials: true, // на випадок, якщо потрібні cookie
  headers: { 'Content-Type': 'application/json' },
});
