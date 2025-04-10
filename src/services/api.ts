import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import jwt from 'jsonwebtoken';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      
      // Verify token expiration
      try {
        const decodedToken: any = jwt.decode(token);
        if (decodedToken && decodedToken.exp) {
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp < currentTime) {
            // Token expired
            localStorage.removeItem('auth_token');
            window.location.href = '/login?expired=true';
            return Promise.reject(new Error('Token expired'));
          }
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Redirect to login page or refresh token
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
