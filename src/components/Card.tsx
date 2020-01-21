import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';
import { MemoryCard } from '../context/memory-context';
import { deviceWidth, theme } from '../Theme';
import { adjustLightness, coolShadow } from '../utils/index';

interface StyledCardProps {
  background: string;
  discovered: boolean;
  className?: string;
}

export const StyledCard = styled(animated.button)<StyledCardProps>`
  height: 150px;
  border-radius: 3px;
  /* padding: 20px; */
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #383838;
  cursor: pointer;
  outline: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  z-index: 2;

  ${({ discovered, background }) =>
    discovered
      ? ` background: ${background}; 
          box-shadow: ${coolShadow(adjustLightness(background, 12), 6)};

          `
      : `background: ${theme.cardColor}; 
          box-shadow: 
          1px -1px 0px ${theme.boxShadow}, 
          2px -2px 0px ${theme.boxShadow},
          3px -3px 0px ${theme.boxShadow}, 
          4px -4px 0px ${theme.boxShadow},
          5px -5px 0px ${theme.boxShadow}, 
          6px -6px 0px ${theme.boxShadow};
      `};

  span {
    font-size: 7rem;
    /* padding: 5px; */
  }

  ${deviceWidth.smallDown`
    height: 60px;
      span {
        font-size: 2.7rem;
      }
  `}
`;

interface CardContentProps {
  isOpen: boolean;
  isCollected: boolean;
  identifier: string[] | null;
}

interface CardProps extends MemoryCard {
  children: React.ReactNode;
  selectCard: (
    e: React.MouseEvent<HTMLButtonElement>,
    card: MemoryCard
  ) => void;
}

export const Card = (card: CardProps) => {
  const { isCollected, isOpen, bgColor, selectCard, children } = card;

  const { transform } = useSpring({
    transform: `perspective(600px) rotateX(${
      isOpen || isCollected ? 180 : 0
    }deg)`,
    config: { tension: 240, friction: 12 }
  });

  return (
    <StyledCard
      discovered={isCollected || isOpen}
      background={bgColor}
      onClick={e => selectCard(e, card)}
      style={{
        transform: transform.interpolate(
          transform => `${transform} rotateX(180deg)`
        )
      }}
    >
      {children}
    </StyledCard>
  );
};

export const CardContent = ({
  isOpen,
  isCollected,
  identifier
}: CardContentProps) => {
  return identifier && <span>{(isOpen || isCollected) && identifier}</span>;
};
