import { fileService } from './fileService';
import { proposalService, Proposal } from './proposalService';
import { DashboardSummary, MetricData, ChartData } from '../models/dashboardModels';

export interface ActivityLog {
  id: string;
  time: string;
  description: string;
  userId: string;
}

export const dashboardService = {
  /**
   * Get dashboard summary metrics
   */
  getDashboardSummary: async (userId?: string): Promise<DashboardSummary> => {
    const proposals = await fileService.readJsonFile<Proposal[]>('proposals');
    
    // Filter by user if userId is provided
    const filteredProposals = userId 
      ? proposals.filter(proposal => proposal.userId === userId)
      : proposals;
    
    // Calculate summary
    const totalProposals = filteredProposals.length;
    const approvedProposals = filteredProposals.filter(p => p.status === 'Paga').length;
    const pendingProposals = filteredProposals.filter(p => p.status === 'Pendente').length;
    const rejectedProposals = filteredProposals.filter(p => p.status === 'Cancelada').length;
    
    return {
      totalProposals,
      approvedProposals,
      pendingProposals,
      rejectedProposals
    };
  },

  /**
   * Get metrics with optional filters
   */
  getMetrics: async (filters?: Record<string, any>): Promise<MetricData> => {
    // Get indicators from proposal service
    const indicators = await proposalService.getProposalIndicators(filters?.userId);
    
    // Calculate completion percentage for target
    // Assuming a fixed target of 200,000 for demo purposes
    const target = 200000;
    const paid = indicators.paid;
    
    return {
      paid,
      target,
      offeredBalance: indicators.inputValue + 50000, // Example calculation
      inputBalance: indicators.inputValue,
      consumedBalance: indicators.paid
    };
  },

  /**
   * Get daily stats
   */
  getDailyStats: async (userId?: string): Promise<{ day: string, amount: number }[]> => {
    const proposals = await fileService.readJsonFile<Proposal[]>('proposals');
    
    // Filter by user if userId is provided
    const filteredProposals = userId 
      ? proposals.filter(proposal => proposal.userId === userId)
      : proposals;
    
    // Group by day and sum amounts
    const stats = filteredProposals.reduce((acc, proposal) => {
      const day = proposal.date.substring(8, 10) + '/' + proposal.date.substring(5, 7);
      
      if (!acc[day]) {
        acc[day] = 0;
      }
      
      if (proposal.status === 'Paga') {
        acc[day] += proposal.value;
      }
      
      return acc;
    }, {} as Record<string, number>);
    
    // Convert to array format
    return Object.entries(stats).map(([day, amount]) => ({ day, amount }));
  },
  
  /**
   * Get operator stats
   */
  getOperatorStats: async (): Promise<{ name: string, amount: number }[]> => {
    const proposals = await fileService.readJsonFile<Proposal[]>('proposals');
    const users = await fileService.readJsonFile<any[]>('users');
    
    // Group paid proposals by userId
    const statsByUserId = proposals
      .filter(p => p.status === 'Paga')
      .reduce((acc, proposal) => {
        if (!acc[proposal.userId]) {
          acc[proposal.userId] = 0;
        }
        acc[proposal.userId] += proposal.value;
        return acc;
      }, {} as Record<string, number>);
    
    // Match with user names
    return Object.entries(statsByUserId).map(([userId, amount]) => {
      const user = users.find(u => u.id === userId);
      const name = user ? user.fullName.split(' ')[0] : 'Unknown';
      return { name, amount };
    });
  },

  /**
   * Get monthly performance data
   */
  getMonthlyPerformance: async (userId?: string): Promise<{ month: string, value: number }[]> => {
    const proposals = await fileService.readJsonFile<Proposal[]>('proposals');
    
    // Filter by user if userId is provided
    const filteredProposals = userId 
      ? proposals.filter(proposal => proposal.userId === userId)
      : proposals;
    
    // Month names in Portuguese
    const monthNames = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    
    // Group by month and sum values
    const monthlyData = filteredProposals
      .filter(p => p.status === 'Paga')
      .reduce((acc, proposal) => {
        const monthIndex = parseInt(proposal.date.substring(5, 7)) - 1; // 0-based month
        const month = monthNames[monthIndex];
        
        if (!acc[month]) {
          acc[month] = 0;
        }
        
        acc[month] += proposal.value;
        return acc;
      }, {} as Record<string, number>);
    
    // Convert to array format
    return Object.entries(monthlyData)
      .map(([month, value]) => ({ month, value }))
      .sort((a, b) => {
        // Sort by month order
        return monthNames.indexOf(a.month) - monthNames.indexOf(b.month);
      });
  },

  /**
   * Get recent activity logs
   */
  getRecentActivity: async (limit = 5, userId?: string): Promise<ActivityLog[]> => {
    const activities = await fileService.readJsonFile<ActivityLog[]>('activities');
    
    // Filter by user if userId is provided
    const filteredActivities = userId 
      ? activities.filter(activity => activity.userId === userId)
      : activities;
    
    // Sort by time (newest first) and limit
    return filteredActivities
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, limit);
  },
  
  /**
   * Log an activity
   */
  logActivity: async (activity: Omit<ActivityLog, 'id'>): Promise<ActivityLog> => {
    const activities = await fileService.readJsonFile<ActivityLog[]>('activities');
    
    // Create new activity log
    const newActivity: ActivityLog = {
      ...activity,
      id: fileService.generateId()
    };
    
    // Add to activities and save
    activities.push(newActivity);
    await fileService.writeJsonFile('activities', activities);
    
    return newActivity;
  },

  /**
   * Get chart data
   */
  getChartData: async (startDate?: string, endDate?: string): Promise<ChartData> => {
    // Get data from other methods
    const dailyStats = await this.getDailyStats();
    const operatorStats = await this.getOperatorStats();
    const summary = await this.getDashboardSummary();
    const monthlyPerformance = await this.getMonthlyPerformance();
    
    return {
      dailyStats,
      operatorStats,
      statusSummary: {
        labels: ['Aprovadas', 'Pendentes', 'Rejeitadas'],
        data: [summary.approvedProposals, summary.pendingProposals, summary.rejectedProposals]
      },
      monthlyPerformance
    };
  }
};
