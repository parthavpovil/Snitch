import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';

export default function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const handleDisconnect = () => {
    setWalletAddress('');
  };

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              !walletAddress ? (
                <HomeScreen onWalletConnect={setWalletAddress} />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              walletAddress ? (
                <DashboardScreen 
                  walletAddress={walletAddress}
                  onDisconnect={handleDisconnect}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </Router>
    </>
  );
}
