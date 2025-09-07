import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole, EducationLevel } from '../../models';
import { AuthService } from '../../services/auth';
import { storeToken, storeRefreshToken, storeTokenExpiration, clearAuthTokens } from '../../utils/tokenUtils';
import { secureStorage } from '../../lib/secure-storage';
import Logger from '../../utils/logUtils';
import { useNavigate } from 'react-router-dom';

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
 * Secure storage Keys
 */
const STORAGE_KEYS = {
  USER: 'auth_user_data',
  ORGANIZATION: 'auth_organization_data',
  IS_AUTHENTICATED: 'auth_is_authenticated',
  SESSION_DATA: 'auth_session_data'
} as const;

/**
 * Helper functions for secure storage operations
 */
const SecureStorageHelper = {
  // Save user data to secure storage
  saveUser: async (user: AuthUser) => {
    try {
      await secureStorage.setItem(STORAGE_KEYS.USER, user);
      await secureStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, true);
      Logger.info('SecureStorageHelper: User data saved to encrypted storage');
    } catch (error) {
      Logger.error('SecureStorageHelper: Failed to save user data:', error);
      throw error;
    }
  },

  // Save organization data to secure storage
  saveOrganization: async (organization: AuthOrganization) => {
    try {
      await secureStorage.setItem(STORAGE_KEYS.ORGANIZATION, organization);
      Logger.info('SecureStorageHelper: Organization data saved to encrypted storage');
    } catch (error) {
      Logger.error('SecureStorageHelper: Failed to save organization data:', error);
      throw error;
    }
  },

  // Get user data from secure storage
  getUser: async (): Promise<AuthUser | null> => {
    try {
      const user = await secureStorage.getItem<AuthUser>(STORAGE_KEYS.USER);
      return user;
    } catch (error) {
      Logger.error('SecureStorageHelper: Failed to get user data:', error);
      return null;
    }
  },

  // Get organization data from secure storage
  getOrganization: async (): Promise<AuthOrganization | null> => {
    try {
      const organization = await secureStorage.getItem<AuthOrganization>(STORAGE_KEYS.ORGANIZATION);
      return organization;
    } catch (error) {
      Logger.error('SecureStorageHelper: Failed to get organization data:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const isAuth = await secureStorage.getItem<boolean>(STORAGE_KEYS.IS_AUTHENTICATED);
      return isAuth === true;
    } catch (error) {
      Logger.error('SecureStorageHelper: Failed to check authentication status:', error);
      return false;
    }
  },

  // Save complete session data
  saveSession: async (user: AuthUser, organization?: AuthOrganization) => {
    try {
      const sessionData = {
        user,
        organization,
        timestamp: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      };
      await secureStorage.setItem(STORAGE_KEYS.SESSION_DATA, sessionData);
      await secureStorage.setItem(STORAGE_KEYS.IS_AUTHENTICATED, true);
      Logger.info('SecureStorageHelper: Complete session saved to encrypted storage');
    } catch (error) {
      Logger.error('SecureStorageHelper: Failed to save session:', error);
      throw error;
    }
  },

  // Get complete session data
  getSession: async (): Promise<{ user: AuthUser; organization?: AuthOrganization } | null> => {
    try {
      const sessionData = await secureStorage.getItem<any>(STORAGE_KEYS.SESSION_DATA);
      if (!sessionData) return null;

      // Check if session has expired
      if (Date.now() > sessionData.expiresAt) {
        Logger.warn('SecureStorageHelper: Session expired, clearing data');
        await SecureStorageHelper.clearAll();
        return null;
      }

      return {
        user: sessionData.user,
        organization: sessionData.organization
      };
    } catch (error) {
      Logger.error('SecureStorageHelper: Failed to get session data:', error);
      return null;
    }
  },

  // Clear all auth data from secure storage
  clearAll: async () => {
    try {
      secureStorage.removeItem(STORAGE_KEYS.USER);
      secureStorage.removeItem(STORAGE_KEYS.ORGANIZATION);
      secureStorage.removeItem(STORAGE_KEYS.IS_AUTHENTICATED);
      secureStorage.removeItem(STORAGE_KEYS.SESSION_DATA);
      await clearAuthTokens(); // Clear encrypted tokens too
      Logger.info('SecureStorageHelper: All auth data cleared from encrypted storage');
    } catch (error) {
      Logger.error('SecureStorageHelper: Failed to clear auth data:', error);
    }
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
 * SIMPLE & PERSISTENT: Uses encrypted secure storage for all auth state
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // State using useState - gets data from encrypted secure storage
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [organization, setOrganization] = useState<AuthOrganization | null>(null);
  
  const navigate = useNavigate();

  /**
   * Initialize authentication state on app load
   * PERSISTENT: Automatically restore user session if valid tokens exist
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        
        // Try to load session from encrypted storage
        const session = await SecureStorageHelper.getSession();
        
        if (session) {
          setUser(session.user);
          setOrganization(session.organization || null);
          setIsAuthenticated(true);
          
          Logger.success('AuthProvider: User session restored from encrypted storage', { 
            userId: session.user.id, 
            role: session.user.role 
          });
        } else {
          // Check individual items as fallback
          const storedUser = await SecureStorageHelper.getUser();
          const storedOrganization = await SecureStorageHelper.getOrganization();
          const isAuth = await SecureStorageHelper.isAuthenticated();
          
          if (storedUser && isAuth) {
            setUser(storedUser);
            setOrganization(storedOrganization);
            setIsAuthenticated(true);
            
            Logger.success('AuthProvider: User session restored from individual encrypted items');
          } else {
            Logger.info('AuthProvider: No stored session found - user starts unauthenticated');
          }
        }
      } catch (error) {
        Logger.error('AuthProvider: Session initialization failed', error);
        await SecureStorageHelper.clearAll();
        setUser(null);
        setOrganization(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

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

        // Save to encrypted storage
        await SecureStorageHelper.saveUser(user);
        if (organization) {
          await SecureStorageHelper.saveOrganization(organization);
        }

        // Update React state - THIS WAS MISSING!
        setUser(user);
        setIsAuthenticated(true);
        if (organization) {
          setOrganization(organization);
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
   * PERSISTENT: Clears all encrypted storage data
   */
  const logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      await SecureStorageHelper.clearAll();
      
      // Update React state - THIS WAS MISSING!
      setUser(null);
      setOrganization(null);
      setIsAuthenticated(false);
      setError(null);
      
      navigate('/login');
      Logger.success('AuthProvider: Logout successful');
    } catch (error) {
      Logger.error('AuthProvider: Logout failed', error);
      // Still clear storage even if API call fails
      await SecureStorageHelper.clearAll();
      
      // Update React state even if API call fails
      setUser(null);
      setOrganization(null);
      setIsAuthenticated(false);
      setError(null);
      
      throw error;
    }
  };

  /**
   * Refresh token function
   * PERSISTENT: Updates tokens in encrypted storage
   */
  const refreshToken = async (): Promise<void> => {
    try {
      await AuthService.refreshToken();
      Logger.success('AuthProvider: Token refreshed successfully');
    } catch (error) {
      Logger.error('AuthProvider: Token refresh failed', error);
      await SecureStorageHelper.clearAll();
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
