import { BaseEntity } from '../BaseEntity';
import { EducationLevel, UserRole, AdminType, TokenStatus } from '../enums';

/**
 * User Interface
 * Central interface for all users in the career guidance system
 */
export interface User extends BaseEntity {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  educationLevel?: EducationLevel; // Optional for non-student roles
  organizationId?: string; // Foreign key to Organization, for ORG_WARDs and ORG_ADMINs
  isOrgWard: boolean; // Flag to identify organizational wards
  isActive: boolean;
  lastLoginAt?: Date;
  emailVerified: boolean;
  emailVerifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Organization Interface
 * Represents organizations that register on the platform
 */
export interface Organization extends BaseEntity {
  name: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  description?: string;
  website?: string;
  adminId: string; // Foreign key to User table, referencing the primary ORG_ADMIN
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Admin Interface
 * For all administrators, including regular org admins and super admins
 */
export interface Admin extends BaseEntity {
  userId: string; // Foreign key to User table
  adminType: AdminType;
  organizationId?: string; // Optional, for ORG_ADMINs
  permissions?: string[]; // Array of permission strings
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Registration Token Interface
 * Manages tokens used for assigning and registering organizational wards
 */
export interface RegistrationToken extends BaseEntity {
  token: string; // The unique token string
  generatedByUserId: string; // Foreign key to User table (ORG_ADMIN who generated token)
  organizationId: string; // Foreign key to Organization table
  status: TokenStatus;
  usedByUserId?: string; // Foreign key to User table (ORG_WARD who used token)
  studentName?: string; // Intended student name
  studentEmail?: string; // Intended student email
  educationLevel?: EducationLevel; // Intended education level
  maxUses: number; // Maximum number of times token can be used
  currentUses: number; // Current number of uses
  createdAt: Date;
  expiresAt: Date;
  usedAt?: Date;
}

/**
 * User Profile Interface
 * Extended user information for profile management
 */
export interface UserProfile extends BaseEntity {
  userId: string; // Foreign key to User table
  firstName?: string;
  lastName?: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  phoneNumber?: string;
  profileImageUrl?: string;
  bio?: string;
  interests?: string[]; // Array of interest tags
  careerGoals?: string[];
  currentInstitution?: string;
  graduationYear?: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Login Credentials Interface
 * For authentication requests
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Register User Input Interface
 * For individual user registration
 */
export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  educationLevel: EducationLevel;
  role?: UserRole; // Defaults to INDIVIDUAL
}

/**
 * Register Organization Input Interface
 * For organization registration
 */
export interface RegisterOrganizationInput {
  // Organization details
  organizationName: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  description?: string;
  website?: string;
  
  // Admin user details
  adminName: string;
  adminEmail: string;
  adminPassword: string;
}

/**
 * Register Org Ward Input Interface
 * For organizational ward registration using token
 */
export interface RegisterOrgWardInput {
  token: string;
  name: string;
  email: string;
  password: string;
  educationLevel: EducationLevel;
}

/**
 * Create Registration Token Input Interface
 * For creating tokens by org admins
 */
export interface CreateRegistrationTokenInput {
  studentName?: string;
  studentEmail?: string;
  educationLevel?: EducationLevel;
  maxUses?: number; // Defaults to 1
  expiresInDays?: number; // Defaults to 7 days
}

/**
 * Update User Input Interface
 * For updating user information
 */
export interface UpdateUserInput {
  name?: string;
  email?: string;
  educationLevel?: EducationLevel;
  isActive?: boolean;
}

/**
 * Update Organization Input Interface
 * For updating organization information
 */
export interface UpdateOrganizationInput {
  name?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  description?: string;
  website?: string;
  isActive?: boolean;
}

/**
 * Auth Token Interface
 * JWT token response from authentication
 */
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
  tokenType: string; // "Bearer"
  user: Omit<User, 'passwordHash'>;
}

/**
 * Refresh Token Payload Interface
 * For token refresh requests
 */
export interface RefreshTokenPayload {
  refreshToken: string;
}
