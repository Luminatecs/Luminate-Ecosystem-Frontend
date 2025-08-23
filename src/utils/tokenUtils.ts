/**
 * Token utility functions for React web application
 * Handles JWT token storage and retrieval using localStorage
 */

// Storage keys
const TOKEN_KEY = 'userToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const TOKEN_EXPIRATION_KEY = 'expires_In';

/**
 * Helper function to check if the current token is expired
 */
export const isTokenExpired = async (): Promise<boolean> => {
  try {
    const expiresInStr = localStorage.getItem(TOKEN_EXPIRATION_KEY);
    if (!expiresInStr) return true; // No expiration date means we should refresh
    
    // Handle both ISO date strings and millisecond timestamps
    let expiresIn: Date;
    if (!isNaN(Number(expiresInStr))) {
      // If it's a number (milliseconds), convert to date
      expiresIn = new Date(Number(expiresInStr));
    } else {
      // If it's a string, parse as date
      expiresIn = new Date(expiresInStr);
    }
    
    // Check if the date is valid
    if (isNaN(expiresIn.getTime())) {
      console.warn('Invalid expiration date, treating as expired');
      return true;
    }
    
    const now = new Date();
    
    // Return true if token is expired (current time is past expiration)
    return now >= expiresIn;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // On error, assume token is expired to be safe
  }
};

/**
 * Helper function to get the current token
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

/**
 * Helper function to get the refresh token
 */
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

/**
 * Store a new token
 */
export const storeToken = async (token: string): Promise<void> => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

/**
 * Store a new refresh token
 */
export const storeRefreshToken = async (token: string): Promise<void> => {
  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch (error) {
    console.error('Error storing refresh token:', error);
  }
};

/**
 * Store token expiration time
 */
export const storeTokenExpiration = async (expiresIn: string): Promise<void> => {
  try {
    localStorage.setItem(TOKEN_EXPIRATION_KEY, expiresIn);
  } catch (error) {
    console.error('Error storing token expiration:', error);
  }
};

/**
 * Clear all stored tokens and auth data
 */
export const clearAuthTokens = async (): Promise<void> => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRATION_KEY);
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
  }
};

/**
 * Check if user has valid authentication tokens
 */
export const hasAuthTokens = async (): Promise<boolean> => {
  try {
    const token = await getToken();
    const refreshToken = await getRefreshToken();
    return !!(token && refreshToken);
  } catch (error) {
    console.error('Error checking auth tokens:', error);
    return false;
  }
};

/**
 * Get token expiration date as Date object
 */
export const getTokenExpiration = async (): Promise<Date | null> => {
  try {
    const expiresInStr = localStorage.getItem(TOKEN_EXPIRATION_KEY);
    if (!expiresInStr) return null;
    return new Date(expiresInStr);
  } catch (error) {
    console.error('Error getting token expiration:', error);
    return null;
  }
};
