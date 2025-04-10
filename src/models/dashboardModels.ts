// Dashboard data models

export interface MetricData {
  id: string;
  title: string;
  value: number;
  unit?: string;
  percentChange?: number;
  target?: number;
  progress?: number;
  color?: string;
  icon?: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
}

export interface ChartData {
  pieData: ChartDataPoint[];
  lineData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }[];
  };
  barData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

export interface DashboardSummary {
  totalDeals: number;
  approvedDeals: number;
  pendingDeals: number;
  rejectedDeals: number;
  conversionRate: number;
  averageProcessingTime: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  description: string;
  timestamp: string;
  userId: string;
  userName: string;
}

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
  dealer?: string;
  status?: string;
  region?: string;
}
