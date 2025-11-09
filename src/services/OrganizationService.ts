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

export interface Organization {
  id: string;
  name: string;
  contactEmail: string;
  contactPhone?: string;
  address: string;
  description?: string;
  website?: string;
  adminId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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

  /**
   * Get all organizations (paginated)
   */
  async getOrganizations(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ApiResponse<PaginatedResponse<Organization>>> {
    try {
      const response = await apiClient.get<ApiResponse<PaginatedResponse<Organization>>>(
        '/organizations',
        { params }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error(error.message || 'Failed to fetch organizations');
    }
  }

  /**
   * Get organization by ID
   */
  async getOrganizationById(id: string): Promise<ApiResponse<Organization>> {
    try {
      const response = await apiClient.get<ApiResponse<Organization>>(`/organizations/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error(error.message || 'Failed to fetch organization');
    }
  }

  /**
   * Update organization
   */
  async updateOrganization(id: string, data: Partial<OrganizationSetupRequest>): Promise<ApiResponse<Organization>> {
    try {
      const response = await apiClient.put<ApiResponse<Organization>>(`/organizations/${id}`, data);
      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data;
      }
      throw new Error(error.message || 'Failed to update organization');
    }
  }
}

const OrganizationService = new OrganizationServiceClass();
export default OrganizationService;
