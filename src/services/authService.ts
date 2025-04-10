import api from './api';
import { User, LoginCredentials, LoginResponse } from '../models/authModels';

export const authService = {
  /**
   * Login user and get auth token
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    
    // Store token in local storage
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage on logout
      localStorage.removeItem('auth_token');
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};
