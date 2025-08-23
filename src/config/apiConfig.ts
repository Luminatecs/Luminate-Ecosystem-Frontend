/**
 * API Configuration
 * Base URL and timeout settings for API calls
 */

const API_CONFIG = {
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  NETWORK_TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;
