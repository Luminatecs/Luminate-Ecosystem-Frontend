import apiClient from '../config/apiClient';

// Library API response interface
export interface LibraryApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  count?: number;
  query?: string;
  error?: string;
}

// School data interface
export interface ISchool {
  REGION: string;
  DISTRICT: string;
  SCHOOL: string;
  CATEGORIES: string;
  LOCATION: string;
  GENDER: string;
  RESIDENCY: string;
  "EMAIL ADDRESS": string;
  Categories2: string;
  electives: string;
  core: string;
}

class LibraryServiceClass {
  /**
   * Get all school data
   */
  async getAllSchoolData(): Promise<LibraryApiResponse<ISchool[]>> {
    try {
      const response = await apiClient.get<LibraryApiResponse<ISchool[]>>('/library/schools');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch school data');
    }
  }

  /**
   * Search school data
   */
  async searchSchoolData(query: string): Promise<LibraryApiResponse<ISchool[]>> {
    try {
      const response = await apiClient.get<LibraryApiResponse<ISchool[]>>(`/library/schools/search?searchTerm=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to search school data');
    }
  }
}

// Export a singleton instance
export const LibraryService = new LibraryServiceClass();
export default LibraryService;
