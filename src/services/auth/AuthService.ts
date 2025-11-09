import apiClient from '../../config/apiClient';
import { 
  LoginDto, 
  RegisterOrganizationDto, 
  RegisterIndividualDto, 
  RegisterOrgWardDto
} from '../../models/Auth/dtos/AuthDto';
import { storeToken, clearAuthTokens, getToken } from '../../utils/tokenUtils';
import { secureStorage } from '../../lib/secure-storage';

// Generic API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface WardBulkCreateRequest {
  wards: {
    guardianName: string;
    guardianEmail: string;
    wardName: string;
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
        
        // Store user data securely
        await secureStorage.setItem('user', response.data.data.user);
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
        
        // Store user data securely
        await secureStorage.setItem('user', response.data.data.user);
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
        
        // Store user data securely
        await secureStorage.setItem('user', response.data.data.user);
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
      await secureStorage.removeItem('user');
      throw new Error(error.response?.data?.error || 'Token refresh failed');
    }
  }

  // Create ward (single)
  async createWard(data: { 
    guardianName: string; 
    guardianEmail: string; 
    wardName: string; 
    educationLevel: string;
    organizationId?: string; // Optional for SUPER_ADMIN
  }): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/create-ward', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Ward creation failed');
    }
  }

  // Create wards in bulk
  async createWardsBulk(data: WardBulkCreateRequest & { organizationId?: string }): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/create-wards-bulk', data);
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
  async getOrganizationWards(organizationId?: string): Promise<ApiResponse> {
    try {
      const url = organizationId 
        ? `/auth/organization-wards?organizationId=${organizationId}`
        : '/auth/organization-wards';
      const response = await apiClient.get<ApiResponse>(url);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch wards');
    }
  }

  // Assign credentials to all unassigned wards
  async assignWardsCredentials(organizationId?: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post<ApiResponse>('/auth/assign-wards-credentials', 
        organizationId ? { organizationId } : {}
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to assign credentials');
    }
  }

  // Login with temporary code
  async loginWithTempCode(tempCode: string, password: string): Promise<ApiResponse> {
    try {
      console.log('🔐 AuthService: Login with temp code');
      const response = await apiClient.post<ApiResponse>('/auth/temp-login', {
        tempCode,
        password
      });
      
      if (response.data.success && response.data.data) {
        // Store token
        storeToken(response.data.data.accessToken);
        
        // Store user data securely
        await secureStorage.setItem('user', response.data.data.user);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Temporary login failed');
    }
  }

  // Change temporary password
  async changeTempPassword(
    tempCode: string,
    newUsername: string,
    newPassword: string
  ): Promise<ApiResponse> {
    try {
      console.log('🔐 AuthService: Changing temporary password');
      const response = await apiClient.post<ApiResponse>('/auth/change-temp-password', {
        tempCode,
        newUsername,
        newPassword
      });
      
      if (response.data.success) {
        // Clear tokens after password change
        clearAuthTokens();
        await secureStorage.removeItem('user');
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to change password');
    }
  }

  // Request password reset
  async forgotPassword(email: string): Promise<ApiResponse> {
    try {
      console.log('📧 AuthService: Requesting password reset');
      const response = await apiClient.post<ApiResponse>('/auth/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to request password reset');
    }
  }

  // Reset password with token
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    try {
      console.log('🔐 AuthService: Resetting password');
      const response = await apiClient.post<ApiResponse>('/auth/reset-password', {
        token,
        newPassword
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to reset password');
    }
  }

  // Validate reset token
  async validateResetToken(token: string): Promise<ApiResponse> {
    try {
      console.log('🔍 AuthService: Validating reset token');
      const response = await apiClient.get<ApiResponse>(`/auth/validate-reset-token/${token}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to validate token');
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      // Clear local storage
      clearAuthTokens();
      await secureStorage.removeItem('user');
      

      await apiClient.post('/auth/logout');
    } catch (error: any) {
      // Even if API call fails, clear local data
      clearAuthTokens();
      await secureStorage.removeItem('user');
    }
  }
}

// Create and export singleton instance
const AuthService = new AuthServiceClass();
export default AuthService;
// Updated at  Sat, Aug 23, 2025 2:42:02 AM
