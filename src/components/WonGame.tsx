import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  config,
  useTransition,
  useChain,
  useSpring,
  animated
} from 'react-spring';
import { useMemoryState, useMemoryDispatch } from '../context/memory-context';
import { StyledCard } from './Card';
import { theme } from '../Theme';
import { Button } from './ui/Button';
import { adjustLightness, coolShadow } from '../utils/index';

// The complete component is crap.

const random = (offset: number) => {
  let int = Math.floor(
    Math.floor(offset + Math.random() * (offset * 2 - offset + 1))
  );

  if (int % 2 === 0) {
    int = -int;
  }

  return int;
};

const Congrats = styled(animated.h2)`
  font-size: 4rem;
  padding: 4rem 0 1rem 0;
  cursor: auto;
  transition: text-shadow ${theme.transition};
  color: ${theme.secondaryColor};
  text-shadow: ${coolShadow(adjustLightness(theme.secondaryColor, 20), 13)};
  &:hover {
    text-shadow: ${coolShadow(adjustLightness(theme.secondaryColor, 15), 110)};
  }

  &.second {
    font-size: 2rem;
    padding-bottom: 6rem;
    padding-top: 0;
    color: ${theme.titleColor};
    text-shadow: ${coolShadow(adjustLightness(theme.titleColor, 20), 6)};
  }

  @media screen and (max-width: 40em) {
    font-size: 2.5rem;
    padding: 25px;
    &.second {
      font-size: 1.2rem;
    }
  }
`;

const ButtonContainer = styled(animated.div)`
  position: absolute;
  left: 50%;
  top: 75%;
  transform: translateX(-50%);

  @media screen and (max-width: 40em) {
    font-size: 1rem;
    padding: 0;
    top: 40%;
    button {
      white-space: nowrap;
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
  const { cards } = useMemoryState();
  const dispatch = useMemoryDispatch();
  const { clientHeight, clientWidth } = grid.current;
  const [wonCards, setWonCards] = useState(cards);
  const [showCongrats, setShowCongrats] = useState(false);

  const firstSpringRef = useRef();
  //@ts-ignore
  const { opacity, transform } = useSpring({
    ref: firstSpringRef,
    config: { ...config.wobbly, friction: 2 },
    from: {
      opacity: 0,
      transform:
        'translate3d(-10px, 40px, 20px) scale(4) rotate(200deg) skew(300deg, 20deg)'
    },
    to: {
      opacity: showCongrats ? 1 : 0,
      transform: 'translate3d(0px, 0px, 0px) scale(1.2) rotate(0deg) skew(0, 0)'
    },
    delay: cards.length * 30
  });

  const secondSpringRef = useRef();
  //@ts-ignore
  const secondSpring = useSpring({
    ref: secondSpringRef,
    config: { ...config.wobbly },
    from: {
      opacity: 0
    },
    to: {
      opacity: showCongrats ? 1 : 0
    },
    delay: 1500
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

  useEffect(() => {
    const timeout = setTimeout(() => setWonCards([]), 400);
    return () => clearTimeout(timeout);
  }, []);

  //@ts-ignore
  useChain([transitionRef, firstSpringRef, secondSpringRef]);

  return (
    <>
      {showCongrats && (
        <div style={{ textAlign: 'center', gridColumn: '1 / 20' }}>
          <Congrats style={{ opacity, transform }}>WINNER!!!</Congrats>
          <Congrats className="second" style={{ opacity, transform }}>
            YOU ARE AMAZING
          </Congrats>
          <ButtonContainer style={secondSpring}>
            <Button
              size="large"
              type="button"
              color="success"
              onClick={() =>
                dispatch({
                  type: 'INIT',
                  payload: { cardCount: 12, cardType: 'foods' }
                })
              }
            >
              <span>Play again</span>
            </Button>
          </ButtonContainer>
        </div>
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
