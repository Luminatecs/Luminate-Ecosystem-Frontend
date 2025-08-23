import apiClient from '../../config/apiClient';
import { 
  LoginDto, 
  RegisterOrganizationDto, 
  RegisterIndividualDto, 
  RegisterOrgWardDto
} from '../../models/Auth/dtos/AuthDto';
import { storeToken, clearAuthTokens, getToken } from '../../utils/tokenUtils';

// Generic API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface WardBulkCreateRequest {
  wards: {
    name: string;
    email: string;
    educationLevel: string;
  }[];
}

export interface WardAssignmentRequest {
  wardId: string;
  credentials: {
    username: string;
    password: string;
  };
}

class AuthServiceClass {
  // Login method
  async login(credentials: LoginDto): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/login', credentials);
      
      if (response.data.success && response.data.data) {
        // Store token if remember_me is true
        if (credentials.remember_me) {
          storeToken(response.data.data.token);
        }
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }

  // Register organization
  async registerOrganization(data: RegisterOrganizationDto): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/register/organization', data);
      
      if (response.data.success && response.data.data) {
        // Store token
        storeToken(response.data.data.token);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Organization registration failed');
    }
  }

  // Register individual
  async registerIndividual(data: RegisterIndividualDto): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/register/individual', data);
      
      if (response.data.success && response.data.data) {
        // Store token
        storeToken(response.data.data.token);
        
        // Store user data
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Individual registration failed');
    }
  }

  // Register org ward
  async registerOrgWard(data: RegisterOrgWardDto): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/register/org-ward', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Ward registration failed');
    }
  }

  // Refresh token
  async refreshToken(): Promise<void> {
    try {
      const currentToken = getToken();
      if (!currentToken) {
        throw new Error('No token available for refresh');
      }

      const response = await apiClient.post<ApiResponse>('/auth/refresh', {
        token: currentToken
      });

      if (response.data.success && response.data.data?.token) {
        storeToken(response.data.data.token);
      }
    } catch (error: any) {
      // Clear invalid token
      clearAuthTokens();
      localStorage.removeItem('user');
      throw new Error(error.response?.data?.error || 'Token refresh failed');
    }
  }

  // Create ward (single)
  async createWard(data: { name: string; email: string; educationLevel: string }): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/wards', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Ward creation failed');
    }
  }

  // Create wards in bulk
  async createWardsBulk(data: WardBulkCreateRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/wards/bulk', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Bulk ward creation failed');
    }
  }

  // Assign credentials to ward
  async assignWardCredentials(data: WardAssignmentRequest): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>(`/wards/${data.wardId}/assign`, {
        credentials: data.credentials
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Ward credential assignment failed');
    }
  }

  // Get organization wards
  async getOrganizationWards(): Promise<ApiResponse> {
    try {
      const response = await apiClient.get<ApiResponse>('/wards');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch wards');
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      // Clear local storage
      clearAuthTokens();
      localStorage.removeItem('user');
      
      // Call logout endpoint if needed
      await apiClient.post('/auth/logout');
    } catch (error: any) {
      // Even if API call fails, clear local data
      clearAuthTokens();
      localStorage.removeItem('user');
    }
  }
}

// Create and export singleton instance
const AuthService = new AuthServiceClass();
export default AuthService;
// Updated at  Sat, Aug 23, 2025 2:42:02 AM
