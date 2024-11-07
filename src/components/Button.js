import React from 'react';
import styled, { keyframes } from 'styled-components';
import { colors, spacing, typography } from '../styles/theme';

const shimmer = keyframes`
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
`;

const scaleAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
`;

export const Button = styled.button`
  /* Size and Layout */
  min-width: 200px;
  padding: ${spacing.md} ${spacing.xl};
  margin: ${spacing.md} 0;

  /* Typography */
  font-size: ${props => props.large ? '18px' : typography.button.fontSize};
  font-weight: 600;
  letter-spacing: 0.5px;
  color: ${colors.white};
  text-transform: uppercase;

  /* Visual Style */
  background: ${colors.gradient};
  background-size: 200% 100%;
  border: none;
  border-radius: 12px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.7 : 1};

  /* Shadow and Effects */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  ${props => props.fullWidth && `
    width: 100%;
  `}
`; 