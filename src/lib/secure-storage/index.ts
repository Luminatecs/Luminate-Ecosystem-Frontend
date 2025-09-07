/**
 * Secure Storage Library
 * Complete solution for encrypted client-side data storage
 * 
 * @description
 * This library provides a comprehensive solution for storing sensitive data
 * in the browser using client-side encryption. It includes:
 * 
 * - AES-GCM encryption with Web Crypto API
 * - Session-based encryption keys with browser fingerprinting
 * - React hooks for state management with encrypted storage
 * - Automatic encryption/decryption with localStorage
 * 
 * @usage
 * ```typescript
 * // Basic usage
 * import { secureStorage } from './secure-storage';
 * await secureStorage.setItem('user-data', { name: 'John', email: 'john@example.com' });
 * const userData = await secureStorage.getItem('user-data');
 * 
 * // React hooks
 * import { useSecureStorage, useUserPreferences } from './secure-storage';
 * const { value, setValue, loading } = useSecureStorage('settings', defaultSettings);
 * const { preferences, updatePreferences } = useUserPreferences();
 * 
 * // Direct encryption
 * import { clientEncryption } from './secure-storage';
 * const encrypted = await clientEncryption.encrypt(data, password);
 * const decrypted = await clientEncryption.decrypt(encrypted, password);
 * ```
 * 
 * @security
 * - Uses AES-GCM 256-bit encryption
 * - PBKDF2 key derivation with 100,000 iterations
 * - Random salt and IV for each encryption
 * - Session-based keys that expire on browser close
 * - Browser fingerprinting for additional security layer
 * 
 * @compatibility
 * - Modern browsers with Web Crypto API support
 * - React 16.8+ (for hooks)
 * - TypeScript support included
 */

// Import for convenience exports
import { secureStorage } from './secureStorage';

// Core encryption utilities
export { clientEncryption, ClientEncryptionService } from './encryption';
export type { EncryptedData } from './encryption';

// Secure storage service
export { secureStorage, SecureLocalStorage } from './secureStorage';

// React hooks
export {
  useSecureStorage,
  useEncryptedUserSession,
  useUserPreferences,
  useSearchHistory,
  useFormAutoSave,
  useAppState
} from './useSecureStorage';

// Convenience exports for common patterns
export const SecureStorage = {
  // Direct storage methods
  setItem: (key: string, value: any) => secureStorage.setItem(key, value),
  getItem: <T = any>(key: string) => secureStorage.getItem<T>(key),
  removeItem: (key: string) => secureStorage.removeItem(key),
  clear: () => secureStorage.clear(),
  
  // Specialized storage methods
  setUserSession: (userData: any) => secureStorage.setUserSession(userData),
  getUserSession: () => secureStorage.getUserSession(),
  setUserPreferences: (preferences: any) => secureStorage.setUserPreferences(preferences),
  getUserPreferences: () => secureStorage.getUserPreferences(),
  
  // Utility methods
  testEncryption: () => secureStorage.testEncryption(),
  getStorageStats: () => secureStorage.getStorageStats(),
  getKeys: () => secureStorage.getKeys()
};

// Type definitions for common use cases
export interface UserSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  organization?: {
    id: string;
    name: string;
    contactEmail: string;
  };
  timestamp: number;
  expiresAt: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  itemsPerPage: number;
  defaultView: 'grid' | 'list';
  notifications: boolean;
  autoSave: boolean;
  lastUpdated: number;
}

export interface StorageStats {
  totalKeys: number;
  secureKeys: number;
  estimatedSize: string;
}

// Default export for convenience
export default SecureStorage;
