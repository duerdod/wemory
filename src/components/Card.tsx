import React from 'react';
import styled from 'styled-components';
import { MemoryCard } from '../context/memory-context';

interface StyledCardProps {
  background: string;
}

const StyledCard = styled.div<StyledCardProps>`
  background: ${p => p.background};
  height: 150px;
  border-radius: 3px;
  padding: 20px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  /* color: white; */
`;

export const Card = ({ id, color }: MemoryCard) => {
  return <StyledCard background={color}>Card</StyledCard>;
};
