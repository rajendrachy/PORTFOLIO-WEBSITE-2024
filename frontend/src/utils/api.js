import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-website-2024-dul3.onrender.com';

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the auth token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
