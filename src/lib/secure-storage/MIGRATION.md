# Secure Storage Migration Guide

This guide helps you integrate the secure storage library into new projects or migrate existing localStorage implementations.

## Quick Setup

### 1. Copy the Library

Copy the entire `secure-storage` folder to your project:

```
your-project/
  src/
    lib/
      secure-storage/        # 👈 Copy this entire folder
        ├── index.ts
        ├── encryption.ts
        ├── secureStorage.ts
        ├── useSecureStorage.ts
        └── README.md
```

### 2. Install Dependencies

No external dependencies required! The library uses only native Web APIs:
- Web Crypto API (built into modern browsers)
- localStorage (standard browser API)
- React (for hooks only)

### 3. Basic Integration

Replace your existing localStorage calls:

```typescript
// OLD: Plain localStorage
localStorage.setItem('user-data', JSON.stringify(userData));
const userData = JSON.parse(localStorage.getItem('user-data') || '{}');

// NEW: Encrypted secure storage
import { secureStorage } from './lib/secure-storage';
await secureStorage.setItem('user-data', userData);
const userData = await secureStorage.getItem('user-data') || {};
```

## Migration Patterns

### Authentication Systems

```typescript
// OLD: Token storage
localStorage.setItem('access_token', token);
localStorage.setItem('refresh_token', refreshToken);

// NEW: Secure token storage
import { secureStorage } from './lib/secure-storage';
await secureStorage.setItem('access_token', token);
await secureStorage.setItem('refresh_token', refreshToken);

// With session management
await secureStorage.setUserSession({
  user: userData,
  tokens: { access_token: token, refresh_token: refreshToken },
  timestamp: Date.now()
});
```

### User Preferences

```typescript
// OLD: Manual preference handling
const savePreferences = (prefs) => {
  localStorage.setItem('user_preferences', JSON.stringify(prefs));
};

// NEW: Secure preferences with hooks
import { useUserPreferences } from './lib/secure-storage';

function SettingsComponent() {
  const { preferences, updatePreferences } = useUserPreferences();
  
  const handleThemeChange = (theme) => {
    updatePreferences({ theme });
  };
}
```

### Form Auto-Save

```typescript
// OLD: Manual form saving
useEffect(() => {
  const timer = setInterval(() => {
    localStorage.setItem('draft', JSON.stringify(formData));
  }, 30000);
  return () => clearInterval(timer);
}, [formData]);

// NEW: Automatic encrypted form saving
import { useFormAutoSave } from './lib/secure-storage';

function FormComponent() {
  const { formData, updateFormData, isSaving } = useFormAutoSave(
    'contact-form',
    { name: '', email: '', message: '' },
    30000 // 30 second intervals
  );
}
```

## Framework-Specific Integration

### React Applications

```typescript
// App.tsx - Basic setup
import { SecureStorage } from './lib/secure-storage';

function App() {
  useEffect(() => {
    // Test encryption on app start
    SecureStorage.testEncryption().then(isWorking => {
      console.log('Secure storage ready:', isWorking);
    });
  }, []);
}

// Component usage
import { useSecureStorage } from './lib/secure-storage';

function MyComponent() {
  const { value: settings, setValue: setSettings, loading } = useSecureStorage('app-settings', {
    theme: 'light',
    notifications: true
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Current theme: {settings.theme}</h2>
      <button onClick={() => setSettings({ ...settings, theme: 'dark' })}>
        Switch Theme
      </button>
    </div>
  );
}
```

### Next.js Applications

```typescript
// pages/_app.tsx
import { useEffect } from 'react';
import { SecureStorage } from '../lib/secure-storage';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      SecureStorage.testEncryption().then(isWorking => {
        if (!isWorking) {
          console.error('Secure storage not available');
        }
      });
    }
  }, []);

  return <Component {...pageProps} />;
}

// For SSR-safe usage
import { useEffect, useState } from 'react';
import { secureStorage } from '../lib/secure-storage';

function MyPage() {
  const [userData, setUserData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      secureStorage.getItem('user-data').then(setUserData);
    }
  }, []);

  if (!isClient) return <div>Loading...</div>;

  return <div>User: {userData?.name}</div>;
}
```

### Vue.js Applications

```typescript
// composables/useSecureStorage.ts
import { ref, onMounted } from 'vue';
import { secureStorage } from '../lib/secure-storage';

export function useSecureStorageComposable(key: string, defaultValue: any) {
  const value = ref(defaultValue);
  const loading = ref(true);
  const error = ref(null);

  onMounted(async () => {
    try {
      const stored = await secureStorage.getItem(key);
      value.value = stored !== null ? stored : defaultValue;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  });

  const setValue = async (newValue: any) => {
    try {
      await secureStorage.setItem(key, newValue);
      value.value = newValue;
      error.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { value, setValue, loading, error };
}
```

## Environment Configuration

### Development Environment

```typescript
// config/storage.ts
const STORAGE_CONFIG = {
  development: {
    enableLogging: true,
    testEncryption: true,
    clearOnError: true
  },
  production: {
    enableLogging: false,
    testEncryption: false,
    clearOnError: false
  }
};

// Initialize with environment config
import { secureStorage } from './lib/secure-storage';

if (process.env.NODE_ENV === 'development') {
  secureStorage.testEncryption().then(isWorking => {
    console.log('🔐 Secure Storage Test:', isWorking ? '✅ Working' : '❌ Failed');
  });
}
```

### Production Deployment

```typescript
// Graceful degradation for unsupported browsers
import { secureStorage } from './lib/secure-storage';

const isSecureStorageSupported = () => {
  return typeof crypto !== 'undefined' && 
         typeof crypto.subtle !== 'undefined' &&
         typeof localStorage !== 'undefined';
};

const storageService = {
  async setItem(key: string, value: any) {
    if (isSecureStorageSupported()) {
      return secureStorage.setItem(key, value);
    } else {
      // Fallback to regular localStorage with warning
      console.warn('Secure storage not supported, using localStorage');
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  async getItem(key: string) {
    if (isSecureStorageSupported()) {
      return secureStorage.getItem(key);
    } else {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  }
};
```

## Testing Integration

### Unit Tests

```typescript
// __tests__/secureStorage.test.ts
import { secureStorage, clientEncryption } from '../lib/secure-storage';

describe('Secure Storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should encrypt and decrypt data correctly', async () => {
    const testData = { test: 'data', number: 123 };
    
    await secureStorage.setItem('test-key', testData);
    const retrieved = await secureStorage.getItem('test-key');
    
    expect(retrieved).toEqual(testData);
  });

  test('should handle encryption failure gracefully', async () => {
    // Mock Web Crypto API failure
    const originalSubtle = crypto.subtle;
    delete crypto.subtle;

    await expect(secureStorage.setItem('test', 'data')).rejects.toThrow();

    // Restore
    crypto.subtle = originalSubtle;
  });

  test('should test encryption functionality', async () => {
    const isWorking = await secureStorage.testEncryption();
    expect(isWorking).toBe(true);
  });
});
```

### React Testing Library

```typescript
// __tests__/useSecureStorage.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { useSecureStorage } from '../lib/secure-storage';

describe('useSecureStorage Hook', () => {
  test('should load and save data', async () => {
    const { result } = renderHook(() => 
      useSecureStorage('test-key', { default: 'value' })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.value).toEqual({ default: 'value' });

    await result.current.setValue({ updated: 'value' });
    expect(result.current.value).toEqual({ updated: 'value' });
  });
});
```

## Performance Optimization

### Batch Operations

```typescript
// Instead of multiple individual calls
await secureStorage.setItem('user-name', name);
await secureStorage.setItem('user-email', email);
await secureStorage.setItem('user-settings', settings);

// Use session storage for related data
await secureStorage.setUserSession({
  name,
  email,
  settings,
  timestamp: Date.now()
});
```

### Lazy Loading

```typescript
// Lazy load encryption for better initial page performance
const useSecureStorageLazy = (key: string, defaultValue: any) => {
  const [storage, setStorage] = useState(null);
  
  useEffect(() => {
    import('./lib/secure-storage').then(({ secureStorage }) => {
      setStorage(secureStorage);
    });
  }, []);

  // Use storage when available...
};
```

## Security Considerations

### Data Classification

```typescript
// Classify your data by sensitivity
const STORAGE_STRATEGY = {
  // High sensitivity - Always encrypt
  SENSITIVE: ['auth_tokens', 'personal_info', 'payment_data'],
  
  // Medium sensitivity - Encrypt in production
  MODERATE: ['user_preferences', 'search_history'],
  
  // Low sensitivity - Can use regular storage
  PUBLIC: ['theme', 'language', 'ui_state']
};

const getStorageMethod = (key: string) => {
  if (STORAGE_STRATEGY.SENSITIVE.some(pattern => key.includes(pattern))) {
    return secureStorage;
  }
  // Add other logic...
};
```

### Key Rotation

```typescript
// Implement key rotation for long-running applications
const rotateEncryptionKeys = async () => {
  const stats = secureStorage.getStorageStats();
  
  if (stats.secureKeys > 50) { // Threshold check
    // Backup current data
    const allData = {};
    for (const key of secureStorage.getKeys()) {
      allData[key] = await secureStorage.getItem(key);
    }
    
    // Clear and re-encrypt with new session
    secureStorage.clear();
    sessionStorage.removeItem('luminate_session_id');
    
    // Restore data with new encryption
    for (const [key, value] of Object.entries(allData)) {
      await secureStorage.setItem(key, value);
    }
  }
};
```

## Troubleshooting

### Common Issues and Solutions

1. **"Cannot find module" errors**
   - Check file paths in imports
   - Ensure the `secure-storage` folder is in the correct location

2. **Encryption errors in older browsers**
   - Check Web Crypto API support
   - Implement fallback strategy

3. **Performance issues**
   - Reduce encryption frequency
   - Use batch operations
   - Monitor storage size

4. **Data loss after browser updates**
   - Normal behavior for session-based keys
   - Implement user notification system

### Debug Mode

```typescript
// Enable debug logging
const debugStorage = {
  async setItem(key: string, value: any) {
    console.log(`🔐 Encrypting: ${key}`, value);
    const result = await secureStorage.setItem(key, value);
    console.log(`✅ Encrypted: ${key}`);
    return result;
  },
  
  async getItem(key: string) {
    console.log(`🔓 Decrypting: ${key}`);
    const result = await secureStorage.getItem(key);
    console.log(`✅ Decrypted: ${key}`, result);
    return result;
  }
};
```

This migration guide should help you integrate the secure storage library into any new project while maintaining security best practices!
