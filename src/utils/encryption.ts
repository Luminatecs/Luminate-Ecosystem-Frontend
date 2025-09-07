/**
 * Client-side encryption utility for secure local storage
 * Uses Web Crypto API for AES-GCM encryption
 */

export interface EncryptedData {
  data: string;
  iv: string;
  salt: string;
}

export class ClientEncryptionService {
  private algorithm = 'AES-GCM';
  private keyLength = 256;
  private ivLength = 12; // 96 bits for GCM
  private saltLength = 16;
  private iterations = 100000;

  /**
   * Derives a key from password using PBKDF2
   */
  private async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt as BufferSource,
        iterations: this.iterations,
        hash: 'SHA-256'
      },
      baseKey,
      { name: this.algorithm, length: this.keyLength },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypts data using Web Crypto API
   */
  public async encrypt(data: string, password: string): Promise<EncryptedData> {
    try {
      // Generate random salt and IV
      const salt = crypto.getRandomValues(new Uint8Array(this.saltLength));
      const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
      
      // Derive key
      const key = await this.deriveKey(password, salt);
      
      // Encrypt data
      const encoder = new TextEncoder();
      const encodedData = encoder.encode(data);
      
      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: this.algorithm, iv },
        key,
        encodedData
      );
      
      // Convert to base64 for storage
      const encryptedArray = new Uint8Array(encryptedBuffer);
      
      return {
        data: this.arrayBufferToBase64(encryptedArray),
        iv: this.arrayBufferToBase64(iv),
        salt: this.arrayBufferToBase64(salt)
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${(error as Error).message}`);
    }
  }

  /**
   * Decrypts data using Web Crypto API
   */
  public async decrypt(encryptedData: EncryptedData, password: string): Promise<string> {
    try {
      // Convert base64 back to arrays
      const salt = this.base64ToArrayBuffer(encryptedData.salt);
      const iv = this.base64ToArrayBuffer(encryptedData.iv);
      const data = this.base64ToArrayBuffer(encryptedData.data);
      
      // Derive key
      const key = await this.deriveKey(password, new Uint8Array(salt));
      
      // Decrypt data
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: this.algorithm, iv: new Uint8Array(iv) },
        key,
        data
      );
      
      // Convert back to string
      const decoder = new TextDecoder();
      return decoder.decode(decryptedBuffer);
    } catch (error) {
      throw new Error(`Decryption failed: ${(error as Error).message}`);
    }
  }

  /**
   * Utility methods for base64 conversion
   */
  private arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  /**
   * Generates a random password for encryption
   */
  public generatePassword(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Creates a hash of data for integrity checking
   */
  public async createHash(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = new Uint8Array(hashBuffer);
    return Array.from(hashArray, byte => byte.toString(16).padStart(2, '0')).join('');
  }
}

// Create singleton instance
export const clientEncryption = new ClientEncryptionService();
