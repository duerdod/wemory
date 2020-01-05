import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import {
  config,
  useTransition,
  useChain,
  useSpring,
  animated,
  interpolate
} from 'react-spring';
import { useMemoryState, useMemoryDispatch } from '../context/memory-context';
import { StyledCard } from './Card';
import { theme } from '../Theme';
import { Button } from './ui/Button';
import { adjustLightness, coolShadow } from '../utils/index';

// The complete component is bull crap.

const random = (offset: number) => {
  let int = Math.floor(
    Math.floor(offset + Math.random() * (offset * 3 - offset + 1))
  );

  if (int % 2 === 0) {
    int = -int;
  }

  return int;
};

const CongratsContainer = styled.div`
  grid-column: 1 / 8;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const Congrats = styled(animated.h2)`
  font-size: 5rem;
  padding: 0 0 1rem 0;
  cursor: auto;
  text-align: center;
  transition: text-shadow ${theme.transition};
  color: ${theme.secondaryColor};
  text-shadow: ${coolShadow(adjustLightness(theme.secondaryColor, 20), 11)};
  &:hover {
    text-shadow: ${coolShadow(adjustLightness(theme.secondaryColor, 20), 110)};
  }

  &.second {
    font-size: 2.5rem;
    padding-bottom: 1.5rem;
    padding-top: 0;
    color: ${theme.titleColor};
    text-shadow: ${coolShadow(adjustLightness(theme.titleColor, 20), 6)};
  }

  @media screen and (max-width: 40em) {
    font-size: 3rem;
    &.second {
      font-size: 1.5rem;
    }
  }
`;

const ButtonContainer = styled(animated.div)`
  @media screen and (max-width: 40em) {
    font-size: 1rem;
    padding: 0;
    button {
      white-space: nowrap;
      font-size: 1rem;
    }
  }
`;

interface TransitionProps {
  item: {
    bgColor: string;
    isOpen: boolean;
    isCollected: boolean;
    identifier: string;
  };
  key: string;
  props: {};
}

// TODO: Add types.
export const WonGame: React.FC<{
  grid: React.MutableRefObject<any>;
}> = ({ grid }): any => {
  const { cards, cardType } = useMemoryState();
  const dispatch = useMemoryDispatch();
  const { clientHeight, clientWidth } = grid.current;
  const [wonCards, setWonCards] = useState(cards);
  const [showCongrats, setShowCongrats] = useState(false);

  const firstSpringRef = useRef();
  //@ts-ignore
  const { opacity, rotate, scale } = useSpring({
    ref: firstSpringRef,
    config: { ...config.molasses, duration: 3000 },
    from: {
      rotate: 0,
      scale: '0'
    },
    to: {
      rotate: 10,
      scale: '1.3'
    },
    delay: cards.length * 20
  });

  const secondSpringRef = useRef();
  //@ts-ignore
  const secondSpring = useSpring({
    ref: secondSpringRef,
    config: { ...config.wobbly, friction: 6 },
    from: {
      opacity: 0,
      transform: 'scale(0.1)'
    },
    to: {
      opacity: 1,
      transform: 'scale(1)'
    },
    delay: 2000
  });

  const transitionRef = useRef();
  //@ts-ignore
  const transition: any = useTransition(
    !showCongrats
      ? wonCards.map(card => ({
          ...card,
          transform: [random(clientWidth), random(clientHeight), random(20)]
        }))
      : [],
    card => card.uniqueId,
    {
      ref: transitionRef,
      initial: { transform: `translate3d(0px, 0px, 0px)` },
      // @ts-ignore
      leave: item => async next => {
        const [x, y, z] = item.transform;
        await next({
          transform: `translate3d(${x}px, ${y}px, ${z}px)`
        });
      },
      onDestroyed: () => setShowCongrats(true),
      config: { ...config.wobbly },
      trail: 30
    }
  );

  const handleClick = useCallback(() => {
    dispatch({
      type: 'INIT',
      payload: { cardCount: cards.length, cardType }
    });
  }, [cards.length, cardType, dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => setWonCards([]), 400);
    return () => clearTimeout(timeout);
  }, []);

  //@ts-ignore
  useChain([transitionRef, firstSpringRef, secondSpringRef]);

  return (
    <>
      {showCongrats && (
        <CongratsContainer>
          <Congrats
            style={{
              opacity,
              transform: interpolate(
                [rotate, scale],
                (r, s) => `rotateZ(-${r}turn) scale(${s})`
              )
            }}
          >
            WINNER!!!
          </Congrats>
          <Congrats
            className="second"
            style={{
              opacity,
              transform: interpolate(
                [rotate, scale],
                (r, s) => `rotateY(${r}turn) scale(${s})`
              )
            }}
          >
            YOU ARE AMAZING
          </Congrats>
          <ButtonContainer style={secondSpring}>
            <Button
              size="large"
              type="button"
              color="success"
              onClick={handleClick}
            >
              <span>Play again</span>
            </Button>
          </ButtonContainer>
        </CongratsContainer>
      )}
      {transition.map(
        ({
          item: { bgColor, isOpen, isCollected, identifier },
          key,
          props
        }: TransitionProps): any => {
          return (
            <StyledCard
              key={key}
              style={props}
              background={bgColor}
              discovered={isCollected || isOpen}
            >
              {identifier && (
                <span>{(isOpen || isCollected) && identifier}</span>
              )}
            </StyledCard>
          );
        }
      )}
    </>
  );
};
