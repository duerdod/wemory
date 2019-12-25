import React from 'react';
import styled from 'styled-components';
import { useSpring, animated, config } from 'react-spring';
import { MemoryCard, useMemoryDispatch } from '../context/memory-context';
import { theme } from '../Theme';

interface StyledCardProps {
  background: string;
  isOpen: boolean;
  isCollected: boolean;
}

const StyledCard = styled(animated.div)<StyledCardProps>`
  height: 150px;
  border-radius: 3px;
  padding: 20px;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  color: #383838;
  ${({ isOpen, background }) =>
    isOpen ? `background: ${background}` : `background: ${theme.cardColor}`};
  ${({ isCollected, background }) =>
    isCollected &&
    `
    background: ${background};
  `};
`;

export const Card = ({
  memoryId,
  uniqueId,
  color,
  isOpen,
  isCollected
}: MemoryCard) => {
  const dispatch = useMemoryDispatch();

  // BOX SHADOW SHOULD ALSO BE ANIMATED.
  const { transform, boxShadow } = useSpring({
    transform: `perspective(600px) rotateX(${
      isOpen || isCollected ? 180 : 0
    }deg)`,
    boxShadow: 'none',
    config: config.wobbly
  });

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
      isOpen={isOpen}
      background={color}
      onClick={selectCard}
      style={{
        boxShadow,
        transform: transform.interpolate(
          transform => `${transform} rotateX(180deg)`
        )
      }}
    >
      {/* {memoryId} */}
    </StyledCard>
  );
};
