import axios from 'axios';

const getBaseURL = () => {
  // En producción (Vercel), siempre usamos /api para que sea relativo al dominio
  if (import.meta.env.PROD) {
    return '/api';
  }

  // Solo en desarrollo local usamos localhost
  return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
};

const API_URL = getBaseURL();

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (e.g., expired token)
    if (error.response && error.response.status === 401) {
      const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/registro';
      
      if (!isAuthPage) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
