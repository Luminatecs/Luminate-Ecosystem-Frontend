import apiClient from '../config/apiClient';
import { UserRole } from '../models';

// User API response interface
export interface UserApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  organizationId?: string;
}

// Paginated response
export interface PaginatedUsersResponse {
  users: User[];
  total: number;
  page?: number;
  limit?: number;
}

class UserServiceClass {
  /**
   * Get all users
   */
  async getUsers(): Promise<UserApiResponse<PaginatedUsersResponse>> {
    try {
      const response = await apiClient.get<UserApiResponse<PaginatedUsersResponse>>('/users');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch users');
    }
  }

  /**
   * Search users by query
   */
  async searchUsers(query: string): Promise<UserApiResponse<PaginatedUsersResponse>> {
    try {
      const response = await apiClient.get<UserApiResponse<PaginatedUsersResponse>>(
        `/users/search?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to search users');
    }
  }

  /**
   * Update user role
   */
  async updateUserRole(userId: string, role: UserRole): Promise<UserApiResponse<{ user: User }>> {
    try {
      const response = await apiClient.patch<UserApiResponse<{ user: User }>>(
        `/users/${userId}/role`,
        { role }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to update user role');
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserApiResponse<User>> {
    try {
      const response = await apiClient.get<UserApiResponse<User>>(`/users/${userId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Failed to fetch user');
    }
  }
}

// Export a singleton instance
export const UserService = new UserServiceClass();
export default UserService;
