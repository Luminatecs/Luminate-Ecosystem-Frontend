import apiClient from '../config/apiClient';

// Generic API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface OrganizationSetupRequest {
  name: string;
  contactEmail: string;
  contactPhone?: string;
  address: string;
  description?: string;
  website?: string;
}

export interface OrganizationSetupResponse {
  organization: {
    id: string;
    name: string;
    contactEmail: string;
    contactPhone?: string;
    address: string;
    description?: string;
    website?: string;
    adminId: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export interface SetupStatusResponse {
  setupComplete: boolean;
  hasOrganization: boolean;
  organizationId?: string;
}

class OrganizationServiceClass {
  /**
   * Complete organization setup
   */
  async setupOrganization(data: OrganizationSetupRequest): Promise<ApiResponse<OrganizationSetupResponse>> {
    try {
      const response = await apiClient.post<ApiResponse<OrganizationSetupResponse>>(
        '/organizations/setup', 
        data
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error(error.message || 'Organization setup failed');
    }
  }

  /**
   * Check organization setup status
   */
  async getSetupStatus(): Promise<ApiResponse<SetupStatusResponse>> {
    try {
      const response = await apiClient.get<ApiResponse<SetupStatusResponse>>('/organizations/setup-status');
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error(error.message || 'Failed to check setup status');
    }
  }
}

const OrganizationService = new OrganizationServiceClass();
export default OrganizationService;
