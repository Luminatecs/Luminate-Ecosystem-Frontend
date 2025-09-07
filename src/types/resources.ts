// Resource interface for the resources system
export interface IResource {
  id: string;
  title: string;
  description: string;
  full_description?: string;
  category: string;
  type: string;
  resource_type: 'students' | 'parents' | 'counselors';
  link?: string;
  features?: string[];
  tags?: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  rating: number;
  featured: boolean;
  free: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
}

// API Response interface
export interface ResourcesResponse {
  data: IResource[];
  total: number;
  page?: number;
  limit?: number;
}

// Create resource data interface
export interface CreateResourceData {
  title: string;
  description: string;
  full_description?: string;
  category: string;
  type: string;
  resource_type: 'students' | 'parents' | 'counselors';
  link?: string;
  features?: string[];
  tags?: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  rating?: number;
  featured?: boolean;
  free?: boolean;
}

// Update resource data interface
export interface UpdateResourceData extends Partial<CreateResourceData> {
  id: string;
}

// Search/Filter parameters
export interface ResourceFilters {
  type?: 'students' | 'parents' | 'counselors';
  category?: string;
  featured?: boolean;
  free?: boolean;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  search?: string;
}
