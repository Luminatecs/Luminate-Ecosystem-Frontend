/**
 * Enrollment Service
 * Handles student enrollment operations - single, bulk, and management
 */

import apiClient from '../config/apiClient';

// Interfaces
export interface BulkEnrollmentData {
  student: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
  };
  guardian: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    relation: string;
    age: number;
  };
  enrollment: {
    gradeLevel: string;
    academicYear: string;
  };
}

export interface SingleEnrollmentRequest {
  organizationId: string;
  enrollmentData: BulkEnrollmentData;
}

export interface BulkEnrollmentRequest {
  organizationId: string;
  enrollmentData: BulkEnrollmentData[];
}

export interface EnrollmentFilters {
  status?: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED' | 'WITHDRAWN';
  academicYear?: string;
  gradeLevel?: string;
}

export interface EnrollmentStats {
  total: number;
  byStatus: Record<string, number>;
  byGradeLevel: Record<string, number>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  count?: number;
}

class EnrollmentServiceClass {
  /**
   * Create a single student enrollment
   */
  async createSingleEnrollment(request: SingleEnrollmentRequest): Promise<ApiResponse> {
    try {
      console.log('📝 EnrollmentService: Creating single enrollment');
      const response = await apiClient.post<ApiResponse>('/enrollment/single', request);
      return response.data;
    } catch (error: any) {
      console.error('❌ EnrollmentService: Failed to create single enrollment', error);
      throw new Error(error.response?.data?.error || 'Failed to create enrollment');
    }
  }

  /**
   * Process bulk enrollment
   */
  async processBulkEnrollment(request: BulkEnrollmentRequest): Promise<ApiResponse> {
    try {
      console.log('📊 EnrollmentService: Processing bulk enrollment', request.enrollmentData.length, 'students');
      const response = await apiClient.post<ApiResponse>('/enrollment/bulk', request);
      return response.data;
    } catch (error: any) {
      console.error('❌ EnrollmentService: Failed to process bulk enrollment', error);
      throw new Error(error.response?.data?.error || 'Failed to process bulk enrollment');
    }
  }

  /**
   * Get enrollments for an organization
   */
  async getEnrollmentsByOrganization(
    organizationId: string,
    filters?: EnrollmentFilters
  ): Promise<ApiResponse> {
    try {
      console.log('🔍 EnrollmentService: Getting enrollments for organization', organizationId);
      
      const params = new URLSearchParams();
      if (filters?.status) params.append('status', filters.status);
      if (filters?.academicYear) params.append('academicYear', filters.academicYear);
      if (filters?.gradeLevel) params.append('gradeLevel', filters.gradeLevel);

      const queryString = params.toString();
      const url = `/enrollment/organization/${organizationId}${queryString ? `?${queryString}` : ''}`;
      
      const response = await apiClient.get<ApiResponse>(url);
      return response.data;
    } catch (error: any) {
      console.error('❌ EnrollmentService: Failed to get enrollments', error);
      throw new Error(error.response?.data?.error || 'Failed to get enrollments');
    }
  }

  /**
   * Update enrollment status
   */
  async updateEnrollmentStatus(
    enrollmentId: string,
    status: 'PENDING' | 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'TRANSFERRED' | 'WITHDRAWN'
  ): Promise<ApiResponse> {
    try {
      console.log('📝 EnrollmentService: Updating enrollment status', enrollmentId, status);
      const response = await apiClient.put<ApiResponse>(`/enrollment/${enrollmentId}/status`, { status });
      return response.data;
    } catch (error: any) {
      console.error('❌ EnrollmentService: Failed to update enrollment status', error);
      throw new Error(error.response?.data?.error || 'Failed to update enrollment status');
    }
  }

  /**
   * Delete enrollment
   */
  async deleteEnrollment(enrollmentId: string): Promise<ApiResponse> {
    try {
      console.log('🗑️  EnrollmentService: Deleting enrollment', enrollmentId);
      const response = await apiClient.delete<ApiResponse>(`/enrollment/${enrollmentId}`);
      return response.data;
    } catch (error: any) {
      console.error('❌ EnrollmentService: Failed to delete enrollment', error);
      throw new Error(error.response?.data?.error || 'Failed to delete enrollment');
    }
  }

  /**
   * Get enrollment statistics
   */
  async getEnrollmentStats(organizationId: string): Promise<ApiResponse<EnrollmentStats>> {
    try {
      console.log('📊 EnrollmentService: Getting enrollment stats', organizationId);
      const response = await apiClient.get<ApiResponse<EnrollmentStats>>(`/enrollment/stats/${organizationId}`);
      return response.data;
    } catch (error: any) {
      console.error('❌ EnrollmentService: Failed to get enrollment stats', error);
      throw new Error(error.response?.data?.error || 'Failed to get enrollment stats');
    }
  }

  /**
   * Download CSV template
   */
  async downloadCSVTemplate(): Promise<string> {
    try {
      console.log('📄 EnrollmentService: Downloading CSV template');
      const response = await apiClient.get('/enrollment/csv/template');
      
      // Response.data will be the CSV string
      return response.data;
    } catch (error: any) {
      console.error('❌ EnrollmentService: Failed to download CSV template', error);
      throw new Error(error.response?.data?.error || 'Failed to download CSV template');
    }
  }

  /**
   * Validate CSV content
   */
  async validateCSV(csvContent: string): Promise<ApiResponse> {
    try {
      console.log('🔍 EnrollmentService: Validating CSV content');
      const response = await apiClient.post<ApiResponse>('/enrollment/csv/validate', { csvContent });
      return response.data;
    } catch (error: any) {
      console.error('❌ EnrollmentService: Failed to validate CSV', error);
      throw new Error(error.response?.data?.error || 'Failed to validate CSV');
    }
  }
}

export const EnrollmentService = new EnrollmentServiceClass();
