import pendingUsers from '../mocks/pendingUsers.json';
import dashboardSummary from '../mocks/dashboardSummary.json';
import metrics from '../mocks/metrics.json';
import chartData from '../mocks/chartData.json';
import recentActivity from '../mocks/recentActivity.json';
import { PendingApprovalUser } from '../models/userModels';

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to make deep copies to avoid modifying the original mock data
const deepCopy = <T>(data: T): T => JSON.parse(JSON.stringify(data));

export const mockService = {
  // Dashboard summary
  getDashboardSummary: async () => {
    await delay(500);
    return deepCopy(dashboardSummary);
  },

  // Metrics with optional filters (filters not implemented in mock)
  getMetrics: async (_filters?: Record<string, any>) => {
    await delay(700);
    return deepCopy(metrics);
  },

  // Chart data with optional date range (filtering not implemented in mock)
  getChartData: async (_startDate?: string, _endDate?: string) => {
    await delay(800);
    return deepCopy(chartData);
  },

  // Recent activity with limit
  getRecentActivity: async (limit = 5) => {
    await delay(600);
    return deepCopy(recentActivity).slice(0, limit);
  },

  // Pending approval users with optional filters
  getPendingApprovalUsers: async (_filters?: Record<string, any>) => {
    await delay(1000);
    return deepCopy(pendingUsers);
  },

  // Update user approval status
  updateUserApprovalStatus: async (userId: string, status: 'approved' | 'rejected', reason?: string) => {
    await delay(1200);
    
    // Find and update the user in our local copy
    const users = deepCopy(pendingUsers) as PendingApprovalUser[];
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users[userIndex].status = status;
    
    // In a real implementation, this would send the update to the server
    // and return the updated user. For mock purposes, we'll just return the updated user.
    return users[userIndex];
  }
};
