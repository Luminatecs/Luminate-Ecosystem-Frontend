/**
 * React hooks for secure local storage
 * Provides encrypted storage with React state management
 */

import { useState, useEffect, useCallback } from 'react';
import { secureStorage } from './secureStorage';

/**
 * Hook for using encrypted local storage with React state
 */
export const useSecureStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadValue = async () => {
      try {
        setLoading(true);
        setError(null);
        const storedValue = await secureStorage.getItem<T>(key);
        setValue(storedValue !== null ? storedValue : defaultValue);
      } catch (err) {
        setError((err as Error).message);
        setValue(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    loadValue();
  }, [key, defaultValue]);

  const setSecureValue = useCallback(async (newValue: T) => {
    try {
      await secureStorage.setItem(key, newValue);
      setValue(newValue);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      throw err;
    }
  }, [key]);

  const removeValue = useCallback(() => {
    secureStorage.removeItem(key);
    setValue(defaultValue);
    setError(null);
  }, [key, defaultValue]);

  return {
    value,
    setValue: setSecureValue,
    removeValue,
    loading,
    error
  };
};

/**
 * Hook for managing encrypted user session
 */
export const useEncryptedUserSession = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        setLoading(true);
        setError(null);
        const userSession = await secureStorage.getUserSession();
        setSession(userSession);
      } catch (err) {
        setError((err as Error).message);
        console.error('Failed to load user session:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const saveSession = useCallback(async (userData: any) => {
    try {
      await secureStorage.setUserSession(userData);
      setSession(userData);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      console.error('Failed to save user session:', err);
      throw err;
    }
  }, []);

  const clearSession = useCallback(() => {
    secureStorage.removeItem('user_session');
    setSession(null);
    setError(null);
  }, []);

  const updateSession = useCallback(async (updates: any) => {
    if (!session) return;
    
    const updatedSession = { ...session, ...updates };
    await saveSession(updatedSession);
  }, [session, saveSession]);

  return {
    session,
    saveSession,
    clearSession,
    updateSession,
    loading,
    error
  };
};

/**
 * Hook for managing user preferences
 */
export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        setLoading(true);
        setError(null);
        const userPrefs = await secureStorage.getUserPreferences();
        setPreferences(userPrefs);
      } catch (err) {
        setError((err as Error).message);
        console.error('Failed to load user preferences:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, []);

  const updatePreferences = useCallback(async (updates: any) => {
    try {
      const updatedPrefs = { ...preferences, ...updates };
      await secureStorage.setUserPreferences(updatedPrefs);
      setPreferences(updatedPrefs);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      console.error('Failed to update preferences:', err);
      throw err;
    }
  }, [preferences]);

  const resetPreferences = useCallback(async () => {
    try {
      secureStorage.removeItem('user_preferences');
      const defaultPrefs = await secureStorage.getUserPreferences();
      setPreferences(defaultPrefs);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      console.error('Failed to reset preferences:', err);
      throw err;
    }
  }, []);

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    loading,
    error
  };
};

/**
 * Hook for managing search history
 */
export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        setError(null);
        const searchHistory = await secureStorage.getSearchHistory();
        setHistory(searchHistory);
      } catch (err) {
        setError((err as Error).message);
        console.error('Failed to load search history:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  const addSearch = useCallback(async (searchTerm: string) => {
    try {
      await secureStorage.addSearchHistory(searchTerm);
      const updatedHistory = await secureStorage.getSearchHistory();
      setHistory(updatedHistory);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      console.error('Failed to add search term:', err);
      throw err;
    }
  }, []);

  const clearHistory = useCallback(async () => {
    try {
      await secureStorage.clearSearchHistory();
      setHistory([]);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      console.error('Failed to clear search history:', err);
      throw err;
    }
  }, []);

  return {
    history,
    addSearch,
    clearHistory,
    loading,
    error
  };
};

/**
 * Hook for form auto-save functionality
 */
export const useFormAutoSave = <T>(formId: string, initialData: T, autoSaveInterval: number = 30000) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load saved form data on mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await secureStorage.getFormData(formId);
        if (savedData) {
          setFormData({ ...initialData, ...savedData });
          setLastSaved(new Date());
        }
      } catch (err) {
        console.error('Failed to load saved form data:', err);
      }
    };

    loadSavedData();
  }, [formId, initialData]);

  // Auto-save functionality
  useEffect(() => {
    if (!formData || JSON.stringify(formData) === JSON.stringify(initialData)) {
      return;
    }

    const autoSave = async () => {
      try {
        setIsSaving(true);
        setError(null);
        await secureStorage.setFormData(formId, formData);
        setLastSaved(new Date());
      } catch (err) {
        setError((err as Error).message);
        console.error('Auto-save failed:', err);
      } finally {
        setIsSaving(false);
      }
    };

    const timeoutId = setTimeout(autoSave, autoSaveInterval);
    return () => clearTimeout(timeoutId);
  }, [formData, formId, initialData, autoSaveInterval]);

  const saveNow = useCallback(async () => {
    try {
      setIsSaving(true);
      setError(null);
      await secureStorage.setFormData(formId, formData);
      setLastSaved(new Date());
    } catch (err) {
      setError((err as Error).message);
      console.error('Manual save failed:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [formData, formId]);

  const clearSavedData = useCallback(() => {
    secureStorage.clearFormData(formId);
    setFormData(initialData);
    setLastSaved(null);
    setError(null);
  }, [formId, initialData]);

  const updateFormData = useCallback((updates: Partial<T> | ((prev: T) => T)) => {
    setFormData(prev => {
      if (typeof updates === 'function') {
        return updates(prev);
      }
      return { ...prev, ...updates };
    });
  }, []);

  return {
    formData,
    updateFormData,
    saveNow,
    clearSavedData,
    isSaving,
    lastSaved,
    error
  };
};

/**
 * Hook for application state management
 */
export const useAppState = <T>(initialState: T) => {
  const [appState, setAppState] = useState<T>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAppState = async () => {
      try {
        setLoading(true);
        setError(null);
        const savedState = await secureStorage.getAppState();
        if (savedState) {
          setAppState({ ...initialState, ...savedState });
        }
      } catch (err) {
        setError((err as Error).message);
        console.error('Failed to load app state:', err);
      } finally {
        setLoading(false);
      }
    };

    loadAppState();
  }, [initialState]);

  const updateAppState = useCallback(async (updates: Partial<T> | ((prev: T) => T)) => {
    try {
      const newState = typeof updates === 'function' 
        ? updates(appState) 
        : { ...appState, ...updates };
      
      await secureStorage.setAppState(newState);
      setAppState(newState);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      console.error('Failed to update app state:', err);
      throw err;
    }
  }, [appState]);

  const clearAppState = useCallback(() => {
    secureStorage.removeItem('app_state');
    setAppState(initialState);
    setError(null);
  }, [initialState]);

  return {
    appState,
    updateAppState,
    clearAppState,
    loading,
    error
  };
};
