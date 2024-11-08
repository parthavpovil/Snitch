import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../contracts/config';
import ContractABI from '../contracts/SnitchPlatform.json';

export const getContract = async () => {
  if (!window.ethereum) throw new Error('Please install MetaMask');
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);
};

// ... rest of the blockchain service code ... 