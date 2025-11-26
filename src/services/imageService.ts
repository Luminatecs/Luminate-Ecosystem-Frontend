import apiClient from '../config/apiClient';
import API_CONFIG from '../config/apiConfig';

/**
 * Fetch history of all uploaded images from the backend
 * @returns Promise with list of all images
 */
export const fetchImageHistory = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get<any>('/resources/history-images');
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch image history');
    }
    const images = response.data.data || [];
    const apiBaseUrl = API_CONFIG.API_BASE_URL.replace('/api', '');
    return images.map((img: any) => ({
      ...img,
      url: `${apiBaseUrl}${img.url}`
    }));
  } catch (error: any) {
    console.error('Error fetching image history:', error.message);
    return [];
  }
};

/**
 * Image Upload Service
 * Handles image uploads to the backend and retrieves image URLs
 * Uses apiClient for consistent API communication with authentication
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface ImageUploadResponse {
  success: boolean;
  message: string;
  data: {
    filename: string;
    originalName: string;
    size: number;
    mimeType: string;
    uploadedAt: string;
    url: string;
  };
}

export interface ImageUploadError {
  success: false;
  message: string;
  error: string;
}

// Allowed image MIME types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

/**
 * Validate image file before upload
 * @param file - The file to validate
 * @throws Error if file is invalid
 */
const validateImageFile = (file: File): void => {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Only images are allowed.');
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 10MB limit');
  }
};

/**
 * Upload an image file to the server
 * @param file - The image file to upload
 * @returns Promise with the image URL and metadata
 */
export const uploadImage = async (file: File): Promise<ImageUploadResponse> => {
  try {
    validateImageFile(file);

    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post<any>(
      '/resources/upload-image',
      formData
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to upload image');
    }

    // Construct full URL using apiClient's base URL
    const uploadPath = response.data.data.path;
    const apiBaseUrl = API_CONFIG.API_BASE_URL.replace('/api', ''); // Remove /api suffix to get domain base
    const fullUrl = `${apiBaseUrl}${uploadPath}`;

    // Return response with constructed URL
    return {
      success: response.data.success,
      message: response.data.message,
      data: {
        ...response.data.data,
        url: fullUrl
      }
    };
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred while uploading the image');
  }
};

/**
 * Upload a logo image (circular profile image)
 * @param file - The logo file to upload
 * @returns Promise with the logo URL and metadata
 */
export const uploadLogo = async (file: File): Promise<ImageUploadResponse> => {
  try {
    validateImageFile(file);

    const formData = new FormData();
    formData.append('logo', file);

    const response = await apiClient.post<any>(
      '/resources/upload-logo',
      formData
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to upload logo');
    }

    // Construct full URL using apiClient's base URL
    const uploadPath = response.data.data.path;
    const apiBaseUrl = API_CONFIG.API_BASE_URL.replace('/api', ''); // Remove /api suffix to get domain base
    const fullUrl = `${apiBaseUrl}${uploadPath}`;

    // Return response with constructed URL
    return {
      success: response.data.success,
      message: response.data.message,
      data: {
        ...response.data.data,
        url: fullUrl
      }
    };
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred while uploading the logo');
  }
};

/**
 * Upload a banner image (wide landscape image)
 * @param file - The banner file to upload
 * @returns Promise with the banner URL and metadata
 */
export const uploadBanner = async (file: File): Promise<ImageUploadResponse> => {
  try {
    validateImageFile(file);

    const formData = new FormData();
    formData.append('banner', file);

    const response = await apiClient.post<any>(
      '/resources/upload-banner',
      formData
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to upload banner');
    }

    // Construct full URL using apiClient's base URL
    const uploadPath = response.data.data.path;
    const apiBaseUrl = API_CONFIG.API_BASE_URL.replace('/api', ''); // Remove /api suffix to get domain base
    const fullUrl = `${apiBaseUrl}${uploadPath}`;

    // Return response with constructed URL
    return {
      success: response.data.success,
      message: response.data.message,
      data: {
        ...response.data.data,
        url: fullUrl
      }
    };
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred while uploading the banner');
  }
};

/**
 * Save both logo and banner images
 * @param logoUrl - URL of the uploaded logo
 * @param bannerUrl - URL of the uploaded banner
 * @param profileId - Optional profile ID to associate the images with
 * @returns Promise with save confirmation
 */
export const saveProfileImages = async (
  logoUrl: string,
  bannerUrl: string,
  profileId?: string
): Promise<ApiResponse> => {
  try {
    if (!logoUrl || !bannerUrl) {
      throw new Error('Both logo and banner URLs are required');
    }

    const response = await apiClient.post<ApiResponse>(
      '/resources/save-profile-images',
      {
        logoUrl,
        bannerUrl,
        profileId: profileId || null
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to save profile images');
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.message || 'An error occurred while saving the images');
  }
};

/**
 * Convert a File object to a data URL for preview
 * @param file - The image file
 * @returns Promise with the data URL
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Fetch all resources from the database
 * @returns Promise with list of all resources
 */
export const fetchAllResources = async (): Promise<any[]> => {
  try {
    const response = await apiClient.get<any>('/resources');
    
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch resources');
    }

    const resources = response.data.data || [];
    
    // Construct full URLs for all resources
    const apiBaseUrl = API_CONFIG.API_BASE_URL.replace('/api', '');
    return resources.map((resource: any) => ({
      ...resource,
      url: `${apiBaseUrl}${resource.path}`
    }));
  } catch (error: any) {
    console.error('Error fetching resources:', error.message);
    return [];
  }
};
