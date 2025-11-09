import API_CONFIG from './apiConfig';
import { isTokenExpired, getToken } from '../utils/tokenUtils';
import Logger from '../utils/logUtils';

// Types for maintaining axios-like interface
interface ApiClientResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: RequestConfig;
}

interface RequestConfig {
  method?: string;
  url?: string;
  baseURL?: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  timeout?: number;
  skipAuthInterceptor?: boolean;
  _retry?: boolean;
}

class ApiClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.API_BASE_URL;
    this.timeout = API_CONFIG.NETWORK_TIMEOUT;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Get authentication headers with Bearer token
   */
  private async getAuthHeaders(skipAuthInterceptor = false): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
    };

    if (skipAuthInterceptor) {
      return headers;
    }
    
    try {
      // Check if token exists
      const token = await getToken();
      if (!token) {
        Logger.warn('ApiClient: No authentication token found');
        return headers;
      }
      
      // Always use the current token - don't try to refresh here to avoid infinite loops
      headers['Authorization'] = `Bearer ${token}`;
      
      // Log token status for debugging
      const expired = await isTokenExpired();
      if (expired) {
        Logger.warn('ApiClient: Using expired token - service layer should handle refresh');
      } else {
        Logger.info('ApiClient: Added valid Bearer token to headers');
      }
      
    } catch (error) {
      Logger.error('ApiClient: Error getting authentication headers', error);
    }

    return headers;
  }

  /**
   * Convert URL search params to query string
   */
  private buildQueryString(params?: any): string {
    if (!params) return '';
    
    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, String(params[key]));
      }
    });
    
    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * Make HTTP request using fetch with axios-like interface
   */
  private async makeRequest<T = any>(
    method: string,
    url: string,
    options: RequestConfig = {}
  ): Promise<ApiClientResponse<T>> {
    const { data, params, headers: customHeaders = {}, timeout = this.timeout, skipAuthInterceptor } = options;
    let timeoutId: any = null;
    
    try {
      // Build full URL
      const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
      const urlWithParams = fullUrl + this.buildQueryString(params);
      
      // Get authentication headers
      const authHeaders = await this.getAuthHeaders(skipAuthInterceptor);
      
      // Merge headers
      const finalHeaders = {
        ...authHeaders,
        ...customHeaders,
      };

      // Prepare request config for logging
      const requestConfig: RequestConfig = {
        method: method.toUpperCase(),
        url: urlWithParams,
        baseURL: this.baseURL,
        data,
        params,
        headers: finalHeaders,
        timeout,
        skipAuthInterceptor,
      };

      // Log the request for debugging
      Logger.debug(`🌐 API Request: ${method.toUpperCase()} ${urlWithParams}`, {
        headers: finalHeaders,
        params,
        data
      });

      // Create AbortController for timeout
      const controller = new AbortController();
      timeoutId = setTimeout(() => {
        Logger.warn(`ApiClient: Request timeout after ${timeout}ms for ${urlWithParams}`);
        controller.abort();
      }, timeout);

      // Prepare request body
      let body: string | FormData | undefined;
      if (data) {
        if (data instanceof FormData) {
          body = data;
          // Remove Content-Type for FormData to let fetch set it automatically
          delete finalHeaders['Content-Type'];
        } else {
          body = JSON.stringify(data);
        }
      }

      Logger.info(`ApiClient: Starting fetch request to: ${urlWithParams}`);

      // Make the fetch request with additional fetch options
      const response = await fetch(urlWithParams, {
        method: method.toUpperCase(),
        headers: finalHeaders,
        body,
        signal: controller.signal,
        // Add cache and credentials options
        cache: 'no-cache',
        credentials: 'omit', // Don't send cookies/credentials
        // Add redirect handling
        redirect: 'follow',
      });

      clearTimeout(timeoutId);
      timeoutId = null;
      Logger.info(`ApiClient: Fetch completed for: ${urlWithParams} with status: ${response.status}`);

      // Parse response
      let responseData: T;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        // Handle non-JSON responses
        responseData = await response.text() as unknown as T;
      }

      // Convert response headers to object
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Create axios-like response object
      const apiResponse: ApiClientResponse<T> = {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        config: requestConfig,
      };

      // Log successful responses
      Logger.debug(`🌐 API Response: ${response.status} ${urlWithParams}`, {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      });

      if (response.ok) {
        return apiResponse;
      } else {
        // Handle non-2xx responses
        Logger.error(`API Error ${response.status}: ${urlWithParams}`, {
          status: response.status,
          data: responseData,
          headers: responseHeaders
        });

        // Handle token expiration - attempt to refresh token
        if (response.status === 401 && !requestConfig._retry) {
          requestConfig._retry = true;

          try {
            const expired = await isTokenExpired();
            if (expired) {
              Logger.info('Token expired, attempting to refresh');
              // Could implement automatic retry here if needed
            }
          } catch (refreshError) {
            Logger.error('Token refresh failed', refreshError);
          }
        }

        // Create error object that mimics axios error structure
        const error: any = new Error(`HTTP ${response.status}: ${response.statusText}`);
        error.response = apiResponse;
        error.config = requestConfig;
        error.request = { _url: urlWithParams };
        
        throw error;
      }

    } catch (error: any) {
      Logger.error('ApiClient: Request failed', error);

      // Clear timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (error.name === 'AbortError') {
        Logger.error(`ApiClient: Request aborted/timeout after ${timeout}ms for ${url}`);
        const timeoutError: any = new Error(`Request timeout after ${timeout}ms`);
        timeoutError.request = { _url: url };
        timeoutError.config = options;
        timeoutError.code = 'TIMEOUT';
        throw timeoutError;
      }

      // Check for various network error types
      if (error.message.includes('Network request failed') || 
          error.message.includes('fetch') ||
          error.message.includes('connection') ||
          error.message.includes('NETWORK_ERROR') ||
          error.code === 'NETWORK_ERROR') {
        
        Logger.error(`ApiClient: Network error for ${url}: ${error.message}`);
        const networkError: any = new Error(`Network error: ${error.message}`);
        networkError.request = { _url: url };
        networkError.config = options;
        networkError.code = 'NETWORK_ERROR';
        throw networkError;
      }

      // Handle network errors
      if (!error.response) {
        if (error.request || error.message.includes('fetch')) {
          // Request made but no response received
          Logger.error('API request made but no response received', {
            request: url,
            method: method,
            error: error.message
          });
        } else {
          // Error in setting up the request
          Logger.error('Error setting up API request', {
            message: error.message,
            request: options
          });
        }
      }

      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config: RequestConfig = {}): Promise<ApiClientResponse<T>> {
    return this.makeRequest<T>('GET', url, config);
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config: RequestConfig = {}): Promise<ApiClientResponse<T>> {
    return this.makeRequest<T>('POST', url, { ...config, data });
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config: RequestConfig = {}): Promise<ApiClientResponse<T>> {
    return this.makeRequest<T>('PUT', url, { ...config, data });
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config: RequestConfig = {}): Promise<ApiClientResponse<T>> {
    return this.makeRequest<T>('DELETE', url, config);
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config: RequestConfig = {}): Promise<ApiClientResponse<T>> {
    return this.makeRequest<T>('PATCH', url, { ...config, data });
  }
}

// Create and export singleton instance (maintaining axios-like usage)
const apiClient = new ApiClient();

export default apiClient;