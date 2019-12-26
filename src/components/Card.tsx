import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { theme } from '../Theme';
import {
  MemoryCard,
  useMemoryDispatch,
  useMemoryState
} from '../context/memory-context';

import { wait, hasLength } from '../utils/index';

interface StyledCardProps {
  background: string;
  isOpen: boolean;
  isCollected: boolean;
}

const StyledCard = styled(animated.button)<StyledCardProps>`
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

export const Card = (card: MemoryCard) => {
  const dispatch = useMemoryDispatch();
  const { selectedCards } = useMemoryState();
  const { isCollected, isOpen, color } = card;

  // BOX SHADOW SHOULD ALSO BE ANIMATED.
  const { transform, boxShadow } = useSpring({
    transform: `perspective(600px) rotateX(${
      isOpen || isCollected ? 180 : 0
    }deg)`,
    boxShadow: 'none',
    config: { tension: 240, friction: 12 }
  });

  useEffect(() => {
    if (hasLength(selectedCards, 2)) {
      wait(600).then((): void =>
        dispatch({ type: 'CLOSE_CARDS', payload: { selectedCards } })
      );
    }
  }, [selectedCards, dispatch]);

  const selectCard = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: 'SELECT',
        payload: {
          selectedCard: card
        }
      });
    },
    [card, dispatch]
  );

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
      {/* {card.memoryId} */}
    </StyledCard>
  );
};
