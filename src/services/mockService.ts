import { fileService } from './fileService';
import { dashboardService } from './dashboardService';
import { PendingApprovalUser } from '../models/userModels';

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockService = {
  // Dashboard summary
  getDashboardSummary: async () => {
    await delay(500);
    return dashboardService.getDashboardSummary();
  },

  // Metrics with optional filters
  getMetrics: async (_filters?: Record<string, any>) => {
    await delay(700);
    return dashboardService.getMetrics(_filters);
  },

  // Chart data with optional date range
  getChartData: async (_startDate?: string, _endDate?: string) => {
    await delay(800);
    return dashboardService.getChartData(_startDate, _endDate);
  },

  // Recent activity with limit
  getRecentActivity: async (limit = 5) => {
    await delay(600);
    return dashboardService.getRecentActivity(limit);
  },

  // Pending approval users with optional filters
  getPendingApprovalUsers: async (_filters?: Record<string, any>) => {
    await delay(1000);
    const users = await fileService.readJsonFile<PendingApprovalUser[]>('users');
    return users.filter(user => user.status === 'pending');
  },

  // Update user approval status
  updateUserApprovalStatus: async (userId: string, status: 'approved' | 'rejected', _reason?: string) => {
    await delay(1200);
    
    // Read users
    const users = await fileService.readJsonFile<any[]>('users');
    
    // Find and update the user in our local copy
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users[userIndex].status = status;
    
    // Save updated users
    await fileService.writeJsonFile('users', users);
    
    return users[userIndex];
  }
};
