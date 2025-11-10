import axios from 'axios';

const baseURL =
  (process.env.NEXT_PUBLIC_API_URL ||
    'https://travel-fs116-teamproject-backend.onrender.com') + '/api';

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
