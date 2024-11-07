import { ethers } from 'ethers';

export const connectWallet = async () => {
  try {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      throw new Error('Please install MetaMask to connect your wallet');
    }

    // Request account access
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // Get the first account
    const account = accounts[0];

    // Create a provider - Fixed provider creation
    const provider = new ethers.BrowserProvider(window.ethereum);
    
    // Get network information
    const network = await provider.getNetwork();

    return {
      account,
      provider,
      network,
    };
  } catch (error) {
    if (error.code === 4001) {
      // User rejected the connection
      throw new Error('Please connect your wallet to continue');
    }
    throw error;
  }
}; 