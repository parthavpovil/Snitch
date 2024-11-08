import { decryptData } from '../services/encryption';

export const getDecryptedReport = async (reportId, encryptedData) => {
  try {
    // Get encryption key for this report
    const keys = JSON.parse(localStorage.getItem('reportKeys') || '{}');
    const encryptionKey = keys[reportId];

    if (!encryptionKey) {
      throw new Error('Encryption key not found for this report');
    }

    // Decrypt the data
    const decryptedData = decryptData(encryptedData, encryptionKey);
    return decryptedData;

  } catch (error) {
    console.error('Error decrypting report:', error);
    throw new Error('Unable to decrypt report data');
  }
}; 