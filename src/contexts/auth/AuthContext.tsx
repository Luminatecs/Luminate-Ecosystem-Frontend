import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, EducationLevel } from '../../models';
import { AuthService } from '../../services/auth';
import { storeToken, storeRefreshToken, storeTokenExpiration, clearAuthTokens } from '../../utils/tokenUtils';
import Logger from '../../utils/logUtils';
import { Navigate, useNavigate } from 'react-router-dom';

/**
 * User Interface for Auth Context
 */
interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  educationLevel?: EducationLevel;
  organizationId?: string;
  organizationSetupComplete?: boolean;
  isOrgWard: boolean;
  isActive: boolean;
  emailVerified: boolean;
}

/**
 * Organization Interface for Auth Context
 */
interface AuthOrganization {
  id: string;
  name: string;
  contactEmail: string;
}

/**
 * localStorage Keys
 */
const STORAGE_KEYS = {
  USER: 'auth_user',
  ORGANIZATION: 'auth_organization',
  IS_AUTHENTICATED: 'auth_is_authenticated',
} as const;

/**
 * Helper functions for localStorage operations
 */
const StorageHelper = {
  // Save user data to localStorage
  saveUser: (user: AuthUser) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, 'true');
  },

  // Save organization data to localStorage
  saveOrganization: (organization: AuthOrganization) => {
    localStorage.setItem(STORAGE_KEYS.ORGANIZATION, JSON.stringify(organization));
  },

  // Get user data from localStorage
  getUser: (): AuthUser | null => {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      Logger.error('Failed to parse user data from localStorage:', error);
      return null;
    }
  },

  // Get organization data from localStorage
  getOrganization: (): AuthOrganization | null => {
    try {
      const orgData = localStorage.getItem(STORAGE_KEYS.ORGANIZATION);
      return orgData ? JSON.parse(orgData) : null;
    } catch (error) {
      Logger.error('Failed to parse organization data from localStorage:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return localStorage.getItem(STORAGE_KEYS.IS_AUTHENTICATED) === 'true';
  },

  // Clear all auth data from localStorage
  clearAll: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ORGANIZATION);
    localStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
    clearAuthTokens(); // Clear tokens too
  },
};

/**
 * Auth Context Interface
 */
interface AuthContextType {
  // State
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  organization: AuthOrganization | null;
  error: string | null;
  
  // Actions
  login: (username: string, password: string, rememberMe?: boolean) => Promise<AuthUser>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  registerOrganization: (data: any) => Promise<void>;
  registerOrgWard: (data: any) => Promise<void>;
  clearError: () => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  isOrgAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  isIndividual: () => boolean;
  isOrgWard: () => boolean;
}

/**
 * Auth Context
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 * SIMPLE & PERSISTENT: Uses localStorage for all auth state
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // Simple state using useState - gets data from localStorage
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get current auth state from localStorage
  const isAuthenticated = StorageHelper.isAuthenticated();
  const user = StorageHelper.getUser();
  const organization = StorageHelper.getOrganization();
  const navigate = useNavigate();

  /**
   * Initialize authentication state on app load
   * PERSISTENT: Automatically restore user session if valid tokens exist
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if we have stored auth data
        if (isAuthenticated && user) {
          Logger.success('AuthProvider: User session restored from localStorage', { 
            userId: user.id, 
            role: user.role 
          });
        } else {
          Logger.info('AuthProvider: No stored session found - user starts unauthenticated');
        }
      } catch (error) {
        Logger.error('AuthProvider: Session initialization failed', error);
        StorageHelper.clearAll();
      }
    };

    initializeAuth();
  }, [isAuthenticated, user]);

  /**
   * Login function
   * PERSISTENT: Stores user data in localStorage for persistence
   */
  const login = async (username: string, password: string, rememberMe = false): Promise<AuthUser> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await AuthService.login({
        username,
        password,
        remember_me: rememberMe,
      });

      if (response.success && response.data) {
        // Store authentication tokens
        if (response.data.accessToken) {
          await storeToken(response.data.accessToken);
        }
        if (response.data.refreshToken) {
          await storeRefreshToken(response.data.refreshToken);
        }
        if (response.data.expiresIn) {
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + (response.data.expiresIn * 1000));
          await storeTokenExpiration(expirationDate.toISOString());
        }

        // Store user data in localStorage
        const user: AuthUser = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          role: response.data.user.role as UserRole,
          educationLevel: response.data.user.educationLevel as EducationLevel,
          organizationId: response.data.user.organizationId,
          organizationSetupComplete: response.data.user.organizationSetupComplete,
          isOrgWard: response.data.user.isOrgWard,
          isActive: response.data.user.isActive,
          emailVerified: response.data.user.emailVerified,
        };

        const organization = response.data.organization ? {
          id: response.data.organization.id,
          name: response.data.organization.name,
          contactEmail: response.data.organization.contactEmail,
        } : undefined;

        // Save to localStorage
        StorageHelper.saveUser(user);
        if (organization) {
          StorageHelper.saveOrganization(organization);
        }

        setIsLoading(false);
        Logger.success('AuthProvider: Login successful', { userId: user.id, role: user.role });
        
        return user;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      Logger.error('AuthProvider: Login failed', error);
      setError(errorMessage);
      setIsLoading(false);
      throw error;
    }
  };

  /**
   * Logout function
   * PERSISTENT: Clears all localStorage data
   */
  const logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      StorageHelper.clearAll();
      setError(null);
      navigate('/login');
      Logger.success('AuthProvider: Logout successful');
    } catch (error) {
      Logger.error('AuthProvider: Logout failed', error);
      // Still clear storage even if API call fails
      StorageHelper.clearAll();
      setError(null);
      throw error;
    }
  };

  /**
   * Refresh token function
   * PERSISTENT: Updates tokens in localStorage
   */
  const refreshToken = async (): Promise<void> => {
    try {
      await AuthService.refreshToken();
      Logger.success('AuthProvider: Token refreshed successfully');
    } catch (error) {
      Logger.error('AuthProvider: Token refresh failed', error);
      StorageHelper.clearAll();
      throw error;
    }
  };

  /**
   * Clear error function
   */
  const clearError = (): void => {
    setError(null);
  };

  /**
   * Role checking functions - use localStorage data directly
   */
  const hasRole = (role: UserRole): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const isOrgAdmin = (): boolean => {
    return hasRole(UserRole.ORG_ADMIN);
  };

  const isSuperAdmin = (): boolean => {
    return hasRole(UserRole.SUPER_ADMIN);
  };

  const isIndividual = (): boolean => {
    return hasRole(UserRole.INDIVIDUAL);
  };

  const isOrgWard = (): boolean => {
    return hasRole(UserRole.ORG_WARD);
  };

  /**
   * Register Organization function
   */
  const registerOrganization = async (data: any): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      Logger.info('AuthProvider: Organization registration started');
      await AuthService.registerOrganization(data);
      
      Logger.success('AuthProvider: Organization registration successful');
    } catch (error: any) {
      Logger.error('AuthProvider: Organization registration failed', error);
      const errorMessage = error.message || 'Organization registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register Organization Ward function
   */
  const registerOrgWard = async (data: any): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      Logger.info('AuthProvider: Org ward registration started');
      await AuthService.registerOrgWard(data);
      
      Logger.success('AuthProvider: Org ward registration successful');
    } catch (error: any) {
      Logger.error('AuthProvider: Org ward registration failed', error);
      const errorMessage = error.message || 'Organization ward registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    organization,
    error,
    login,
    logout,
    refreshToken,
    registerOrganization,
    registerOrgWard,
    clearError,
    hasRole,
    hasAnyRole,
    isOrgAdmin,
    isSuperAdmin,
    isIndividual,
    isOrgWard,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use Auth Context
 * SECURITY: Ensures context is used within AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
