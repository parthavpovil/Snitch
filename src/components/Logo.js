import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/theme';

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const LogoText = styled.h1`
  font-size: 72px;
  font-weight: 800;
  color: ${colors.primary};
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  padding: 0;
  position: relative;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  
  /* Gradient effect */
  background: linear-gradient(135deg, #2196F3 0%, #1565C0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* Optional: Add a subtle animation on load */
  animation: fadeIn 0.5s ease-in;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Tagline = styled.p`
  font-size: 16px;
  color: ${colors.text}99;
  margin-top: 8px;
  letter-spacing: 1px;
`;

export const Logo = () => {
  return (
    <LogoWrapper>
      <LogoText>SNITCH</LogoText>
      <Tagline>Your Crypto Companion</Tagline>
    </LogoWrapper>
  );
}; 