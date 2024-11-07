import React, { useState } from 'react';
import { connectWallet } from '../services/wallet';
import styled from 'styled-components';

// Enhanced gradient background with more intensity
const GradientBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #E3F2FD 0%,
    #90CAF9 20%,
    #64B5F6 40%,
    #42A5F5 60%,
    #2196F3 80%,
    #1E88E5 100%
  );
  animation: gradientShift 15s ease infinite;
  background-size: 400% 400%;

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

const HomeScreen = ({ onWalletConnect }) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      setError('');
      const { account } = await connectWallet();
      onWalletConnect(account);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <GradientBackground>
      <div className="min-h-screen flex items-center justify-center p-6 backdrop-blur-sm">
        <div className="max-w-md w-full space-y-8 text-center">
          {/* Logo Section with subtle shadow */}
          <div className="transform transition-all duration-500 hover:scale-105">
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 drop-shadow-md">
              SNITCH
            </h1>
            <p className="mt-2 text-gray-700 font-medium">Your Crypto Companion</p>
          </div>

          {/* Glass effect card container - centered content */}
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-xl flex flex-col items-center">
            {/* Button Section */}
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className={`
                relative w-72 h-16
                flex justify-center items-center
                px-8 py-3
                text-xl font-bold
                rounded-xl
                bg-white
                text-primary-dark
                border-2 border-primary/50
                shadow-lg
                transform transition-all duration-300
                hover:bg-primary-light hover:text-white hover:border-primary-light
                hover:shadow-xl hover:-translate-y-0.5
                active:translate-y-0
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isConnecting ? 'animate-pulse' : ''}
              `}
            >
              {/* Button Icon */}
              <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <span className="ml-4"> 
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </span>
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50/80 backdrop-blur-sm rounded-lg">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default HomeScreen;