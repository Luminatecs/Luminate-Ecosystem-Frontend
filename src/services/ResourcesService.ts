import apiClient from '../config/apiClient';
import { 
  IResource, 
  CreateResourceInput, 
  UpdateResourceInput, 
  ResourcesApiResponse 
} from '../models/Resource';

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
  async createResource(resourceData: CreateResourceInput): Promise<ResourcesApiResponse<IResource>> {
    try {
      const response = await apiClient.post<ResourcesApiResponse<IResource>>('/resources', resourceData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to create resource');
    }
  }

  /**
   * Get a single resource by ID
   */
  async getResourceById(id: string): Promise<ResourcesApiResponse<IResource>> {
    try {
      const response = await apiClient.get<ResourcesApiResponse<IResource>>(`/resources/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch resource');
    }
  }

  /**
   * Update a resource
   */
  async updateResource(id: string, resourceData: UpdateResourceInput): Promise<ResourcesApiResponse<IResource>> {
    try {
      const response = await apiClient.put<ResourcesApiResponse<IResource>>(`/resources/${id}`, resourceData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to update resource');
    }
  }

  /**
   * Delete a resource (soft delete)
   */
  async deleteResource(id: string): Promise<ResourcesApiResponse<void>> {
    try {
      const response = await apiClient.delete<ResourcesApiResponse<void>>(`/resources/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to delete resource');
    }
  }
}

// Export a singleton instance
export const ResourcesService = new ResourcesServiceClass();
export default ResourcesService;
