import axios from 'axios';

const JWT = process.env.REACT_APP_PINATA_JWT;

export const uploadToIPFS = async (file) => {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('file', file);

    // Configure pinata specific metadata
    const metadata = JSON.stringify({
      name: `snitch_${Date.now()}`,
      keyvalues: {
        type: file.type,
        size: file.size,
        timestamp: new Date().toISOString()
      }
    });
    formData.append('pinataMetadata', metadata);

    // Upload options
    const pinataOptions = JSON.stringify({
      cidVersion: 1,
      customPinPolicy: {
        regions: [
          {
            id: 'FRA1',
            desiredReplicationCount: 1
          },
          {
            id: 'NYC1',
            desiredReplicationCount: 1
          }
        ]
      }
    });
    formData.append('pinataOptions', pinataOptions);

    // Upload file to IPFS through Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      formData,
      {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log('Upload Progress:', percentCompleted);
        }
      }
    );

    console.log('File uploaded to IPFS:', response.data.IpfsHash);
    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to IPFS:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to upload file to IPFS');
  }
};

// Get IPFS URL from hash
export const getIPFSUrl = (hash) => {
  if (!hash) return null;
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
};

// Optional: Function to test the connection
export const testPinataConnection = async () => {
  try {
    const response = await axios.get('https://api.pinata.cloud/data/testAuthentication', {
      headers: {
        Authorization: `Bearer ${JWT}`
      }
    });
    console.log('Pinata Connection Test:', response.data);
    return true;
  } catch (error) {
    console.error('Pinata Connection Test Failed:', error);
    return false;
  }
}; 