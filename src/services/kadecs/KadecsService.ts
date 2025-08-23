import apiClient from '../../config/apiClient';

/**
 * KadecsService.ts
 * Service for interacting with the Kadecs API endpoints.
 */
class KadecsService {
  async getData() {
    try {
      const response = await apiClient.get('/kadecs');
      return response.data;
    } catch (error) {
      console.error('Error fetching Kadecs data:', error);
      throw error;
    }
  }

  async createData(data: any) {
    try {
      const response = await apiClient.post('/kadecs', data);
      return response.data;
    } catch (error) {
      console.error('Error creating Kadecs data:', error);
      throw error;
    }
  }

  // Add more methods as needed for your Kadecs API interactions
}

export default new KadecsService();
