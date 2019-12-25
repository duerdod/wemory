import React from 'react';
import styled from 'styled-components';
import { MemoryCard, useMemoryDispatch } from '../context/memory-context';

interface StyledCardProps {
  background: string;
  isCollected: boolean;
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
  ${({ isCollected }) => isCollected && 'opacity: 0.7'};
`;

export const Card = ({
  memoryId,
  uniqueId,
  color,
  isCollected
}: MemoryCard) => {
  const dispatch = useMemoryDispatch();

  const selectCard = () =>
    dispatch({
      type: 'SELECT',
      payload: {
        memoryId,
        uniqueId
      }
    });

  return (
    <StyledCard
      isCollected={isCollected}
      background={color}
      onClick={selectCard}
    >
      Card
    </StyledCard>
  );
};
