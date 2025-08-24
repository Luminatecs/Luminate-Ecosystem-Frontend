import { EducationLevel, UserRole, IndustryType } from '../enums';

/**
 * Individual User Registration DTO
 * For users registering as individuals (not through an organization)
 */
export interface RegisterIndividualDto {
  name: string;
  username: string;
  email: string;
  password: string;
  educationLevel: EducationLevel;
  confirmPassword: string;
  termsAccepted: boolean;
}

/**
 * Individual User Registration Response DTO
 */
export interface RegisterIndividualResponseDto {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      educationLevel: EducationLevel;
      isOrgWard: boolean;
      emailVerified: boolean;
      createdAt: Date;
    };
    verificationEmailSent: boolean;
  };
}

/**
 * Organization Registration DTO
 * For organizations registering with their admin user
 */
export interface RegisterOrganizationDto {
  // Organization details
  organizationName: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  description?: string;
  website?: string;
  
  // Admin user details
  adminName: string;
  adminUsername: string;
  adminEmail: string;
  adminPassword: string;
  confirmPassword: string;
  
  // Legal/compliance
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
}
}

/**
 * Organization Registration Response DTO
 */
export interface RegisterOrganizationResponseDto {
  success: boolean;
  message: string;
  data: {
    organization: {
      id: string;
      name: string;
      contact_email: string;
      admin_id: string;
      is_active: boolean;
      created_at: Date;
    };
    admin_user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      organization_id: string;
      is_org_ward: boolean;
      email_verified: boolean;
      created_at: Date;
    };
    verification_email_sent: boolean;
  };
}

/**
 * Organizational Ward Registration DTO
 * For students registering using a token from their organization
 */
export interface RegisterOrgWardDto {
  token: string;
  name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  education_level: EducationLevel;
  terms_accepted: boolean;
}

/**
 * Organizational Ward Registration Response DTO
 */
export interface RegisterOrgWardResponseDto {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      educationLevel: EducationLevel;
      organizationId: string;
      isOrgWard: boolean;
      emailVerified: boolean;
      createdAt: Date;
    };
    organization: {
      id: string;
      name: string;
      contactEmail: string;
    };
    tokenUsed: {
      id: string;
      token: string;
      usedAt: Date;
    };
  };
}

/**
 * Login DTO
 * For all user types authentication
 */
export interface LoginDto {
  username: string;
  password: string;
  remember_me?: boolean;
}

/**
 * Login Response DTO
 */
export interface LoginResponseDto {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      educationLevel?: EducationLevel;
      organizationId?: string;
      isOrgWard: boolean;
      isActive: boolean;
      emailVerified: boolean;
      lastLoginAt: Date;
    };
    organization?: {
      id: string;
      name: string;
      contactEmail: string;
    };
  };
}

/**
 * Token Refresh DTO
 */
export interface RefreshTokenDto {
  refreshToken: string;
}

/**
 * Token Refresh Response DTO
 */
export interface RefreshTokenResponseDto {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
}

/**
 * Logout DTO
 */
export interface LogoutDto {
  refreshToken?: string;
}

/**
 * Logout Response DTO
 */
export interface LogoutResponseDto {
  success: boolean;
  message: string;
}

/**
 * Email Verification DTO
 */
export interface VerifyEmailDto {
  token: string;
  email: string;
}

/**
 * Email Verification Response DTO
 */
export interface VerifyEmailResponseDto {
  success: boolean;
  message: string;
  data: {
    userId: string;
    email: string;
    verifiedAt: Date;
  };
}

/**
 * Resend Verification Email DTO
 */
export interface ResendVerificationDto {
  email: string;
}

/**
 * Resend Verification Email Response DTO
 */
export interface ResendVerificationResponseDto {
  success: boolean;
  message: string;
  data: {
    email: string;
    sentAt: Date;
  };
}

/**
 * Password Reset Request DTO
 */
export interface ForgotPasswordDto {
  email: string;
}

/**
 * Password Reset Request Response DTO
 */
export interface ForgotPasswordResponseDto {
  success: boolean;
  message: string;
  data: {
    email: string;
    resetEmailSent: boolean;
    sentAt: Date;
  };
}

/**
 * Password Reset DTO
 */
export interface ResetPasswordDto {
  token: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Password Reset Response DTO
 */
export interface ResetPasswordResponseDto {
  success: boolean;
  message: string;
  data: {
    userId: string;
    email: string;
    passwordResetAt: Date;
  };
}

/**
 * Change Password DTO
 * For authenticated users changing their password
 */
export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/**
 * Change Password Response DTO
 */
export interface ChangePasswordResponseDto {
  success: boolean;
  message: string;
  data: {
    userId: string;
    passwordChangedAt: Date;
  };
}

/**
 * Organization Registration DTO
 * For organizations registering with comprehensive details
 */
export interface OrganizationRegistrationDto {
  name: string;
  description: string;
  industryType: IndustryType;
  website?: string;
  contactEmail: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  adminPassword: string;
}

/**
 * Organization Ward Registration DTO
 * For students registering using a token from their organization
 */
export interface OrgWardRegistrationDto {
  registrationToken: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  studentId: string;
  educationLevel: EducationLevel;
}
