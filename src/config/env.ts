// Environment configurations

// Base API URL based on environment
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Environment specific settings
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

// Feature flags
export const FEATURE_FLAGS = {
  enableCharts: process.env.REACT_APP_ENABLE_CHARTS !== 'false',
  enableNotifications: process.env.REACT_APP_ENABLE_NOTIFICATIONS === 'true',
  debugMode: process.env.REACT_APP_DEBUG_MODE === 'true',
};

// Timeout settings
export const API_TIMEOUT = parseInt(process.env.REACT_APP_API_TIMEOUT || '30000', 10);

// App version
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';
