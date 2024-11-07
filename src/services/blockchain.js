import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../contracts/config';
import ContractABI from '../contracts/SnitchPlatform.json';

// Get contract instance
const getContract = async () => {
  if (!window.ethereum) throw new Error('Please install MetaMask');
  
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ContractABI.abi, signer);
};

// ... rest of the blockchain service code ... 