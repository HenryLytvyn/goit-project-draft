// lib/api/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api', // всі клієнтські запити йдуть через Next.js API routes
  withCredentials: true,
});
