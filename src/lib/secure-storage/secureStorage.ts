/**
 * Secure Local Storage Service
 * Provides encrypted storage for sensitive client-side data
 */

import { clientEncryption, EncryptedData } from './encryption';

export class SecureLocalStorage {
  private encryptionKey: string;

  constructor() {
    // Generate or retrieve a session-based encryption key
    this.encryptionKey = this.generateSessionKey();
  }

  /**
   * Generates a session-based encryption key
   */
  private generateSessionKey(): string {
    // Create a key based on session and browser fingerprint
    const sessionId = sessionStorage.getItem('luminate_session_id') || this.createSessionId();
    const browserFingerprint = this.getBrowserFingerprint();
    return `${sessionId}-${browserFingerprint}`;
  }

  private createSessionId(): string {
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    sessionStorage.setItem('luminate_session_id', sessionId);
    return sessionId;
  }

  private getBrowserFingerprint(): string {
    try {
      // Create a simple browser fingerprint
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Luminate fingerprint', 2, 2);
      }
      
      // eslint-disable-next-line no-restricted-globals
      const screenInfo = `${screen.width}x${screen.height}`;
      
      return btoa(
        navigator.userAgent +
        navigator.language +
        screenInfo +
        new Date().getTimezoneOffset() +
        (canvas.toDataURL ? canvas.toDataURL() : 'no-canvas')
      ).slice(0, 32);
    } catch (error) {
      // Fallback fingerprint
      return btoa(
        navigator.userAgent +
        navigator.language +
        Date.now().toString()
      ).slice(0, 32);
    }
  }

  /**
   * Encrypts and stores data in localStorage
   */
  public async setItem(key: string, value: any): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      const encrypted = await clientEncryption.encrypt(jsonValue, this.encryptionKey);
      localStorage.setItem(`luminate_secure_${key}`, JSON.stringify(encrypted));
    } catch (error) {
      console.error('Failed to encrypt and store data:', error);
      throw new Error('Failed to store secure data');
    }
  }

  /**
   * Retrieves and decrypts data from localStorage
   */
  public async getItem<T = any>(key: string): Promise<T | null> {
    try {
      const encryptedData = localStorage.getItem(`luminate_secure_${key}`);
      if (!encryptedData) return null;

      const encrypted: EncryptedData = JSON.parse(encryptedData);
      const decryptedJson = await clientEncryption.decrypt(encrypted, this.encryptionKey);
      return JSON.parse(decryptedJson);
    } catch (error) {
      console.error('Failed to decrypt data:', error);
      return null;
    }
  }

  /**
   * Removes item from localStorage
   */
  public removeItem(key: string): void {
    localStorage.removeItem(`luminate_secure_${key}`);
  }

  /**
   * Clears all secure items
   */
  public clear(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('luminate_secure_')) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Lists all secure storage keys (without the prefix)
   */
  public getKeys(): string[] {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith('luminate_secure_'))
      .map(key => key.replace('luminate_secure_', ''));
  }

  /**
   * Stores user session data securely
   */
  public async setUserSession(userData: any): Promise<void> {
    await this.setItem('user_session', {
      ...userData,
      timestamp: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
    });
  }

  /**
   * Retrieves user session data
   */
  public async getUserSession(): Promise<any | null> {
    const session = await this.getItem('user_session');
    if (!session) return null;

    // Check if session has expired
    if (Date.now() > session.expiresAt) {
      this.removeItem('user_session');
      return null;
    }

    return session;
  }

  /**
   * Stores user preferences securely
   */
  public async setUserPreferences(preferences: any): Promise<void> {
    await this.setItem('user_preferences', {
      ...preferences,
      lastUpdated: Date.now()
    });
  }

  /**
   * Gets user preferences
   */
  public async getUserPreferences(): Promise<any> {
    const defaultPreferences = {
      theme: 'light',
      itemsPerPage: 10,
      defaultView: 'grid',
      notifications: true,
      autoSave: true
    };

    const stored = await this.getItem('user_preferences');
    return stored ? { ...defaultPreferences, ...stored } : defaultPreferences;
  }

  /**
   * Stores search history securely
   */
  public async addSearchHistory(searchTerm: string): Promise<void> {
    if (!searchTerm.trim()) return;
    
    const history = await this.getItem<string[]>('search_history') || [];
    const updatedHistory = [searchTerm.trim(), ...history.filter(term => term !== searchTerm.trim())].slice(0, 10);
    await this.setItem('search_history', updatedHistory);
  }

  /**
   * Gets search history
   */
  public async getSearchHistory(): Promise<string[]> {
    return await this.getItem<string[]>('search_history') || [];
  }

  /**
   * Clears search history
   */
  public async clearSearchHistory(): Promise<void> {
    await this.setItem('search_history', []);
  }

  /**
   * Stores form data temporarily (for auto-save functionality)
   */
  public async setFormData(formId: string, formData: any): Promise<void> {
    await this.setItem(`form_data_${formId}`, {
      data: formData,
      timestamp: Date.now(),
      expiresAt: Date.now() + (60 * 60 * 1000) // 1 hour
    });
  }

  /**
   * Gets saved form data
   */
  public async getFormData(formId: string): Promise<any | null> {
    const saved = await this.getItem(`form_data_${formId}`);
    if (!saved) return null;

    // Check if form data has expired
    if (Date.now() > saved.expiresAt) {
      this.removeItem(`form_data_${formId}`);
      return null;
    }

    return saved.data;
  }

  /**
   * Removes saved form data
   */
  public clearFormData(formId: string): void {
    this.removeItem(`form_data_${formId}`);
  }

  /**
   * Stores application state
   */
  public async setAppState(state: any): Promise<void> {
    await this.setItem('app_state', {
      ...state,
      lastUpdated: Date.now()
    });
  }

  /**
   * Gets application state
   */
  public async getAppState(): Promise<any | null> {
    return await this.getItem('app_state');
  }

  /**
   * Utility method to check if encryption is working
   */
  public async testEncryption(): Promise<boolean> {
    try {
      const testData = { test: 'encryption test', timestamp: Date.now() };
      await this.setItem('encryption_test', testData);
      const retrieved = await this.getItem('encryption_test');
      this.removeItem('encryption_test');
      
      return JSON.stringify(testData) === JSON.stringify(retrieved);
    } catch (error) {
      console.error('Encryption test failed:', error);
      return false;
    }
  }

  /**
   * Gets storage statistics
   */
  public getStorageStats(): { totalKeys: number; secureKeys: number; estimatedSize: string } {
    const allKeys = Object.keys(localStorage);
    const secureKeys = allKeys.filter(key => key.startsWith('luminate_secure_'));
    
    // Estimate size (rough calculation)
    let totalSize = 0;
    secureKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        totalSize += key.length + value.length;
      }
    });

    return {
      totalKeys: allKeys.length,
      secureKeys: secureKeys.length,
      estimatedSize: `${(totalSize / 1024).toFixed(2)} KB`
    };
  }
}

// Create singleton instance
export const secureStorage = new SecureLocalStorage();
