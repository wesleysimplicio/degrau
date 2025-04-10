import api from './api';
import { DashboardSummary, MetricData, ChartData } from '../models/dashboardModels';
import { mockService } from './mockService';

// Flag to determine whether to use mock data or real API
const USE_MOCK_DATA = true;

export const dashboardService = {
  /**
   * Get dashboard summary metrics
   */
  getDashboardSummary: async (): Promise<DashboardSummary> => {
    if (USE_MOCK_DATA) {
      return mockService.getDashboardSummary();
    }
    const response = await api.get('/dashboard/summary');
    return response.data;
  },

  /**
   * Get metrics with optional filters
   */
  getMetrics: async (filters?: Record<string, any>): Promise<MetricData[]> => {
    if (USE_MOCK_DATA) {
      return mockService.getMetrics(filters);
    }
    const response = await api.get('/dashboard/metrics', { params: filters });
    return response.data;
  },

  /**
   * Get chart data with optional date range
   */
  getChartData: async (startDate?: string, endDate?: string): Promise<ChartData> => {
    if (USE_MOCK_DATA) {
      return mockService.getChartData(startDate, endDate);
    }
    const response = await api.get('/dashboard/charts', { 
      params: { startDate, endDate } 
    });
    return response.data;
  },

  /**
   * Get recent activity logs
   */
  getRecentActivity: async (limit = 5): Promise<any[]> => {
    if (USE_MOCK_DATA) {
      return mockService.getRecentActivity(limit);
    }
    const response = await api.get('/dashboard/activity', { 
      params: { limit } 
    });
    return response.data;
  },
  
  /**
   * Get users pending approval with optional filters
   */
  getPendingApprovalUsers: async (filters?: Record<string, any>): Promise<any[]> => {
    if (USE_MOCK_DATA) {
      return mockService.getPendingApprovalUsers(filters);
    }
    const response = await api.get('/users/pending-approval', { params: filters });
    return response.data;
  },
  
  /**
   * Approve or reject a user
   */
  updateUserApprovalStatus: async (userId: string, status: 'approved' | 'rejected', reason?: string): Promise<any> => {
    if (USE_MOCK_DATA) {
      return mockService.updateUserApprovalStatus(userId, status, reason);
    }
    const response = await api.put(`/users/${userId}/approval-status`, { 
      status, 
      reason 
    });
    return response.data;
  }
};
