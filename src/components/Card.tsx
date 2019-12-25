import React from 'react';
import styled from 'styled-components';
import { MemoryCard, useMemoryDispatch } from '../context/memory-context';

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
  cursor: pointer;
  color: #383838;
`;

export const Card = ({ id, color }: MemoryCard) => {
  const dispatch = useMemoryDispatch();
  const selectCard = () => dispatch({ type: 'SELECT', id });
  return (
    <StyledCard background={color} onClick={selectCard}>
      Card
    </StyledCard>
  );
};
