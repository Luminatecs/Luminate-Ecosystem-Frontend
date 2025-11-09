/**
 * Education Level Enum
 * Defines the educational levels for career guidance users
 */

export enum EducationLevel {
  JHS1 = 'JHS1',
  JHS2 = 'JHS2', 
  JHS3 = 'JHS3',
  SHS1 = 'SHS1',
  SHS2 = 'SHS2',
  SHS3 = 'SHS3',
  UNIVERSITY = 'UNIVERSITY'
}

/**
 * User Role Enum
 * Defines the different user roles in the career guidance system
 */

export enum UserRole {
  INDIVIDUAL = 'INDIVIDUAL',
  ORG_WARD = 'ORG_WARD',
  ORG_ADMIN = 'ORG_ADMIN',
  ACCESS_ADMIN = 'ACCESS_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

/**
 * Admin Type Enum
 * Defines the different types of administrators
 */

export enum AdminType {
  ORG_ADMIN = 'ORG_ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN'
}

/**
 * Registration Token Status Enum
 * Defines the status of registration tokens
 */

export enum TokenStatus {
  ACTIVE = 'ACTIVE',
  USED = 'USED',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED'
}

/**
 * Industry Type Enum
 * Defines the different industry types for organizations
 */
export enum IndustryType {
  EDUCATION = 'EDUCATION',
  HEALTHCARE = 'HEALTHCARE',
  TECHNOLOGY = 'TECHNOLOGY',
  FINANCE = 'FINANCE',
  MANUFACTURING = 'MANUFACTURING',
  GOVERNMENT = 'GOVERNMENT',
  NON_PROFIT = 'NON_PROFIT',
  OTHER = 'OTHER'
}
