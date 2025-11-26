/**
 * API Configuration
 * Base URL and timeout settings for API calls
 */
const isDev = window.location.hostname === 'localhost';

const API_CONFIG = {
  API_BASE_URL: isDev ? 'http://localhost:3002/api' : 'api',
  NETWORK_TIMEOUT: 30000, // 30 seconds
};

export default API_CONFIG;

 