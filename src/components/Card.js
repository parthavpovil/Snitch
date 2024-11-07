import styled from 'styled-components';
import { colors, spacing, shadows } from '../styles/theme';

export const Card = styled.div`
  background: ${colors.cardBg};
  border-radius: 16px;
  padding: ${spacing.xl};
  box-shadow: ${shadows.md};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.lg};
  }
`; 