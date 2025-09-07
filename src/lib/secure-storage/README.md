# Secure Storage Library

A comprehensive client-side encryption solution for secure local storage in web applications.

## Features

- 🔐 **AES-GCM Encryption**: Industry-standard 256-bit encryption using Web Crypto API
- 🔑 **Session-based Keys**: Automatic key generation with browser fingerprinting
- ⚛️ **React Hooks**: Ready-to-use hooks for React state management
- 🛡️ **TypeScript Support**: Full type safety and IntelliSense support
- 🎯 **Zero Dependencies**: Uses only native Web APIs
- 🔄 **Auto-Save**: Built-in form auto-save functionality
- 📊 **Storage Analytics**: Monitor encryption usage and performance

## Installation

Simply copy the `secure-storage` folder to your project's `lib` directory:

```
src/
  lib/
    secure-storage/
      ├── index.ts          # Main exports
      ├── encryption.ts     # Core encryption utilities
      ├── secureStorage.ts  # Secure storage service
      └── useSecureStorage.ts # React hooks
```

## Quick Start

### Basic Usage

```typescript
import { secureStorage } from './lib/secure-storage';

// Store encrypted data
await secureStorage.setItem('user-settings', { theme: 'dark', language: 'en' });

// Retrieve decrypted data
const settings = await secureStorage.getItem('user-settings');
console.log(settings); // { theme: 'dark', language: 'en' }

// Remove data
secureStorage.removeItem('user-settings');
```

### React Hooks

```typescript
import { useSecureStorage, useUserPreferences } from './lib/secure-storage';

function SettingsComponent() {
  // Basic secure storage hook
  const { value: settings, setValue: setSettings, loading } = useSecureStorage('app-settings', {
    theme: 'light',
    notifications: true
  });

  // Specialized user preferences hook
  const { preferences, updatePreferences } = useUserPreferences();

  const handleThemeChange = async (theme: string) => {
    await updatePreferences({ theme });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Settings</h2>
      <p>Current theme: {preferences?.theme}</p>
      <button onClick={() => handleThemeChange('dark')}>
        Switch to Dark Mode
      </button>
    </div>
  );
}
```

### Form Auto-Save

```typescript
import { useFormAutoSave } from './lib/secure-storage';

function ContactForm() {
  const {
    formData,
    updateFormData,
    saveNow,
    clearSavedData,
    isSaving,
    lastSaved
  } = useFormAutoSave('contact-form', {
    name: '',
    email: '',
    message: ''
  }, 30000); // Auto-save every 30 seconds

  return (
    <form>
      <input
        value={formData.name}
        onChange={(e) => updateFormData({ name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        placeholder="Email"
      />
      <textarea
        value={formData.message}
        onChange={(e) => updateFormData({ message: e.target.value })}
        placeholder="Message"
      />
      
      {isSaving && <span>Saving...</span>}
      {lastSaved && <span>Last saved: {lastSaved.toLocaleTimeString()}</span>}
      
      <button type="button" onClick={saveNow}>Save Now</button>
      <button type="button" onClick={clearSavedData}>Clear Draft</button>
    </form>
  );
}
```

### Direct Encryption

```typescript
import { clientEncryption } from './lib/secure-storage';

// Encrypt sensitive data
const sensitiveData = "user's private information";
const password = "secure-password-123";

const encrypted = await clientEncryption.encrypt(sensitiveData, password);
console.log(encrypted);
// {
//   data: "base64-encrypted-data...",
//   iv: "base64-initialization-vector...",
//   salt: "base64-salt..."
// }

// Decrypt the data
const decrypted = await clientEncryption.decrypt(encrypted, password);
console.log(decrypted); // "user's private information"
```

## API Reference

### Core Storage Methods

#### `secureStorage.setItem(key: string, value: any): Promise<void>`
Encrypts and stores data in localStorage.

#### `secureStorage.getItem<T>(key: string): Promise<T | null>`
Retrieves and decrypts data from localStorage.

#### `secureStorage.removeItem(key: string): void`
Removes encrypted data from localStorage.

#### `secureStorage.clear(): void`
Removes all encrypted data from localStorage.

### Specialized Storage Methods

#### `secureStorage.setUserSession(userData: any): Promise<void>`
Stores user session data with automatic expiration (24 hours).

#### `secureStorage.getUserSession(): Promise<any | null>`
Retrieves user session data, automatically checking expiration.

#### `secureStorage.setUserPreferences(preferences: any): Promise<void>`
Stores user preferences with timestamp.

#### `secureStorage.getUserPreferences(): Promise<any>`
Retrieves user preferences with default values.

### React Hooks

#### `useSecureStorage<T>(key: string, defaultValue: T)`
Basic hook for encrypted storage with React state management.

**Returns:**
- `value: T` - Current value
- `setValue: (value: T) => Promise<void>` - Set new value
- `removeValue: () => void` - Remove value
- `loading: boolean` - Loading state
- `error: string | null` - Error state

#### `useUserPreferences()`
Specialized hook for user preferences management.

#### `useFormAutoSave<T>(formId: string, initialData: T, autoSaveInterval?: number)`
Hook for automatic form data saving with encryption.

#### `useSearchHistory()`
Hook for managing encrypted search history.

### Utility Methods

#### `secureStorage.testEncryption(): Promise<boolean>`
Tests if encryption is working correctly.

#### `secureStorage.getStorageStats(): StorageStats`
Returns statistics about encrypted storage usage.

## Security Features

### Encryption Specifications
- **Algorithm**: AES-GCM 256-bit
- **Key Derivation**: PBKDF2 with 100,000 iterations
- **Salt**: Random 16-byte salt per encryption
- **IV**: Random 12-byte initialization vector per encryption
- **Hash**: SHA-256 for key derivation and integrity

### Session Security
- Encryption keys are derived from browser sessions
- Keys include browser fingerprinting for additional security
- Sessions expire when browser is closed
- No encryption keys are stored persistently

### Data Protection
- All sensitive data is encrypted before localStorage storage
- Decryption failures result in automatic data cleanup
- No plain text sensitive data is ever stored
- Memory-safe encryption operations

## Browser Compatibility

- **Chrome**: 60+
- **Firefox**: 60+
- **Safari**: 13+
- **Edge**: 79+

Requires Web Crypto API support.

## TypeScript Support

Full TypeScript definitions are included:

```typescript
import { 
  secureStorage, 
  useSecureStorage, 
  UserSession, 
  UserPreferences,
  StorageStats 
} from './lib/secure-storage';

// Type-safe usage
const session: UserSession = await secureStorage.getUserSession();
const { preferences }: { preferences: UserPreferences } = useUserPreferences();
```

## Migration Guide

### From localStorage

```typescript
// Before
localStorage.setItem('user-data', JSON.stringify(userData));
const userData = JSON.parse(localStorage.getItem('user-data') || '{}');

// After
await secureStorage.setItem('user-data', userData);
const userData = await secureStorage.getItem('user-data') || {};
```

### From sessionStorage

```typescript
// Before
sessionStorage.setItem('temp-data', JSON.stringify(tempData));

// After
await secureStorage.setItem('temp-data', tempData);
// Note: Data will persist until manually cleared, but encryption keys expire with session
```

## Performance Considerations

- Encryption operations are asynchronous and may take 1-5ms per operation
- Large objects (>1MB) may impact performance
- Use batching for multiple operations when possible
- Monitor storage usage with `getStorageStats()`

## Best Practices

1. **Always use await** with storage operations
2. **Handle errors** gracefully with try-catch blocks
3. **Use TypeScript** types for type safety
4. **Test encryption** with `testEncryption()` during development
5. **Monitor storage** usage to prevent localStorage limits
6. **Clear sensitive data** when no longer needed

## Troubleshooting

### Common Issues

**Q: "Decryption failed" errors**
A: This usually happens when the session key changes. Clear the storage and re-authenticate.

**Q: Performance issues with large data**
A: Consider chunking large objects or using compression before encryption.

**Q: Data not persisting across browser restarts**
A: This is expected behavior for session-based keys. Use persistent keys if needed.

### Debugging

Enable debugging by checking storage stats:

```typescript
const stats = secureStorage.getStorageStats();
console.log('Storage Stats:', stats);

// Test encryption
const isWorking = await secureStorage.testEncryption();
console.log('Encryption working:', isWorking);
```

## License

This library is part of the Luminate Ecosystem project and follows the same licensing terms.
