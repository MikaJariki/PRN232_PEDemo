import axios from 'axios';

const envBaseUrl =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'https://localhost:5001';
const trimmedBaseUrl = envBaseUrl.replace(/\/$/, '');
const apiBaseUrl = trimmedBaseUrl.endsWith('/api') ? trimmedBaseUrl : `${trimmedBaseUrl}/api`;

const api = axios.create({
  baseURL: apiBaseUrl
});

export default api;
