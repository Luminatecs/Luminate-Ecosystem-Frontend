/**
 * Resource Interface Models
 * Shared types for resource management across the application
 */

/**
 * Resource Type - Target audience for the resource
 */
export type ResourceType = 'students' | 'parents' | 'counselors';

/**
 * Difficulty Level
 */
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

/**
 * Complete Resource Interface
 */
export interface IResource {
  // Core identifiers
  id: string;
  
  // Basic information (required)
  title: string;                    // Input field
  description: string;              // TextArea (short, 3 rows)
  full_description: string;         // TextArea (detailed, 5 rows)
  category: string;                 // Input field
  type: string;                     // Input field
  
  // Classification (required dropdown)
  resource_type: ResourceType;      // Dropdown: students | parents | counselors
  
  // Optional classification
  difficulty?: DifficultyLevel;     // Dropdown: Beginner | Intermediate | Advanced (optional)
  
  // Metadata
  rating: number;                   // Number input (0-5, step 0.1)
  link?: string;                    // Input field (URL, optional)
  featured: boolean;                // Checkbox
  image?: string;                   // Input field (URL, optional)
  duration?: string;                // Input field (optional)
  tags?: string[];                  // Tag input (press Enter to add)
  free: boolean;                    // Checkbox
  
  // Features (required, array)
  features: string[];               // Tag input (press Enter to add, min 1 required)
  
  // Timestamps & status
  created_at: string;
  updated_at: string;
  is_active: boolean;
  
  // Creator tracking
  created_by?: string;
}

/**
 * Input interface for creating resources
 * Used in POST /api/resources
 */
export interface CreateResourceInput {
  // Required fields
  title: string;                    // Input field
  description: string;              // TextArea (3 rows)
  full_description: string;         // TextArea (5 rows)
  category: string;                 // Input field (e.g., "Career Planning", "Skills Development")
  type: string;                     // Input field (e.g., "Article", "Video", "Course")
  resource_type: ResourceType;      // Dropdown: students | parents | counselors
  features: string[];               // Tag input (min 1 required)
  
  // Optional fields
  rating?: number;                  // Number input (0-5, step 0.1, default: 0)
  link?: string;                    // Input field (URL)
  featured?: boolean;               // Checkbox (default: false)
  image?: string;                   // Input field (URL)
  duration?: string;                // Input field (e.g., "2 hours", "5 weeks")
  difficulty?: DifficultyLevel;     // Dropdown (optional)
  tags?: string[];                  // Tag input
  free?: boolean;                   // Checkbox (default: true)
  created_by?: string;              // Auto-populated from auth context
}

/**
 * Input interface for updating resources
 * Used in PUT /api/resources/:id
 * All fields are optional except those being updated
 */
export interface UpdateResourceInput {
  title?: string;                   // Input field
  description?: string;             // TextArea (3 rows)
  full_description?: string;        // TextArea (5 rows)
  category?: string;                // Input field
  type?: string;                    // Input field
  resource_type?: ResourceType;     // Dropdown
  rating?: number;                  // Number input (0-5, step 0.1)
  link?: string;                    // Input field (URL)
  featured?: boolean;               // Checkbox
  image?: string;                   // Input field (URL)
  features?: string[];              // Tag input
  duration?: string;                // Input field
  difficulty?: DifficultyLevel;     // Dropdown
  tags?: string[];                  // Tag input
  free?: boolean;                   // Checkbox
}

/**
 * API Response wrapper
 */
export interface ResourcesApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  count?: number;
  query?: string;
  type?: string;
  error?: string;
}

/**
 * Form field configuration for UI generation
 */
export interface ResourceFormField {
  name: keyof CreateResourceInput;
  label: string;
  type: 'input' | 'textarea' | 'number' | 'url' | 'dropdown' | 'checkbox' | 'tags';
  required: boolean;
  placeholder?: string;
  options?: string[] | ResourceType[] | DifficultyLevel[];
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: any;
}

/**
 * Complete form configuration
 */
export const RESOURCE_FORM_FIELDS: ResourceFormField[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'input',
    required: true,
    placeholder: 'Enter resource title'
  },
  {
    name: 'description',
    label: 'Short Description',
    type: 'textarea',
    required: true,
    placeholder: 'Brief description of the resource',
    rows: 3
  },
  {
    name: 'full_description',
    label: 'Full Description',
    type: 'textarea',
    required: true,
    placeholder: 'Detailed description of the resource',
    rows: 5
  },
  {
    name: 'category',
    label: 'Category',
    type: 'input',
    required: true,
    placeholder: 'e.g., Career Planning, Skills Development'
  },
  {
    name: 'type',
    label: 'Type',
    type: 'input',
    required: true,
    placeholder: 'e.g., Article, Video, Course'
  },
  {
    name: 'resource_type',
    label: 'Resource Type',
    type: 'dropdown',
    required: true,
    options: ['students', 'parents', 'counselors'] as ResourceType[],
    defaultValue: 'students'
  },
  {
    name: 'difficulty',
    label: 'Difficulty',
    type: 'dropdown',
    required: false,
    options: ['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]
  },
  {
    name: 'link',
    label: 'Link',
    type: 'url',
    required: false,
    placeholder: 'https://example.com/resource'
  },
  {
    name: 'image',
    label: 'Image URL',
    type: 'url',
    required: false,
    placeholder: 'https://example.com/image.jpg'
  },
  {
    name: 'duration',
    label: 'Duration',
    type: 'input',
    required: false,
    placeholder: 'e.g., 2 hours, 5 weeks'
  },
  {
    name: 'rating',
    label: 'Rating (0-5)',
    type: 'number',
    required: false,
    min: 0,
    max: 5,
    step: 0.1,
    defaultValue: 0
  },
  {
    name: 'features',
    label: 'Features',
    type: 'tags',
    required: true,
    placeholder: 'Type feature and press Enter'
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'tags',
    required: false,
    placeholder: 'Type tag and press Enter'
  },
  {
    name: 'featured',
    label: 'Featured Resource',
    type: 'checkbox',
    required: false,
    defaultValue: false
  },
  {
    name: 'free',
    label: 'Free Resource',
    type: 'checkbox',
    required: false,
    defaultValue: true
  }
];
