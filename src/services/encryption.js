import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';

// Public key for encryption (can be in public code)
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvlxz6O0m...
-----END PUBLIC KEY-----`;

const encryptor = new JSEncrypt();
encryptor.setPublicKey(PUBLIC_KEY);

// Encrypt a single field
export const encryptField = (value) => {
  try {
    if (!value || value === '') return encryptor.encrypt('');
    return encryptor.encrypt(String(value));
  } catch (error) {
    console.error('Encryption error:', error);
    return encryptor.encrypt('');
  }
};

// Encrypt a report
export const encryptReport = (reportData) => {
  try {
    return {
      description: encryptField(reportData.description || ''),
      location: encryptField(reportData.location || ''),
      city: encryptField(reportData.city || ''),
      timestamp: Date.now().toString()
    };
  } catch (error) {
    console.error('Report encryption error:', error);
    throw new Error('Failed to encrypt report data');
  }
};

// Decrypt a single field
export const decryptField = (encryptedValue, key) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedValue, key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Field decryption error:', error);
    throw new Error('Failed to decrypt field');
  }
};

// Store encryption keys (you might want to use a more secure storage method)
export const storeEncryptionKey = (reportId, keys) => {
  const storedKeys = JSON.parse(localStorage.getItem('reportKeys') || '{}');
  storedKeys[reportId] = keys;
  localStorage.setItem('reportKeys', JSON.stringify(storedKeys));
};

// Utility to decrypt a report
export const decryptReport = (reportId, encryptedData) => {
  const storedKeys = JSON.parse(localStorage.getItem('reportKeys') || '{}');
  const keys = storedKeys[reportId];
  
  if (!keys) {
    throw new Error('Encryption keys not found for this report');
  }

  return {
    description: decryptField(encryptedData.description, keys.description),
    location: decryptField(encryptedData.location, keys.location),
    city: decryptField(encryptedData.city, keys.city)
  };
}; 