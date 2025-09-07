import apiClient from '../config/apiClient';

// Resources API response interface
export interface ResourcesApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  count?: number;
  query?: string;
  type?: string;
  error?: string;
}

// Resource data interface
export interface IResource {
  id: string;
  title: string;
  description: string;
  full_description: string;
  category: string;
  type: string;
  resource_type: 'students' | 'parents' | 'counselors';
  rating: number;
  link?: string;
  featured: boolean;
  image?: string;
  features: string[];
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
  free: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
  is_active: boolean;
}

class ResourcesServiceClass {
  /**
   * Get all resources
   */
  async getAllResources(): Promise<ResourcesApiResponse<IResource[]>> {
    try {
      const response = await apiClient.get<ResourcesApiResponse<IResource[]>>('/resources');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch resources');
    }
  }

  /**
   * Get resources by type
   */
  async getResourcesByType(resourceType: 'students' | 'parents' | 'counselors'): Promise<ResourcesApiResponse<IResource[]>> {
    try {
      const response = await apiClient.get<ResourcesApiResponse<IResource[]>>(`/resources/type/${resourceType}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch resources by type');
    }
  }

  /**
   * Search resources
   */
  async searchResources(query: string): Promise<ResourcesApiResponse<IResource[]>> {
    try {
      const response = await apiClient.get<ResourcesApiResponse<IResource[]>>(`/resources/search?searchTerm=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to search resources');
    }
  }

  /**
   * Create a new resource
   */
  async createResource(resourceData: Omit<IResource, 'id' | 'created_at' | 'updated_at' | 'is_active'>): Promise<ResourcesApiResponse<IResource>> {
    try {
      const response = await apiClient.post<ResourcesApiResponse<IResource>>('/resources', resourceData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to create resource');
    }
  }
}

// Export a singleton instance
export const ResourcesService = new ResourcesServiceClass();
export default ResourcesService;
