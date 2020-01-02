import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  config,
  useTransition,
  useChain,
  useSpring,
  animated
} from 'react-spring';
import {
  useMemoryState,
  useMemoryDispatch,
  initialState
} from '../context/memory-context';
import { StyledCard } from './Card';

import { TitleStyle } from './ui/TitleStyle';
import { theme } from '../Theme';

// This is crap

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
  ${TitleStyle}
  font-size: 4rem;
  padding: 10rem 0;
  cursor: auto;
`;

const PlayAgain = styled(animated.button)`
  color: ${theme.titleColor};
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translateX(-50%);
`;

// TODO: Add types.
export const WonGame = ({ grid }: any): any => {
  const { cards } = useMemoryState();
  const dispatch = useMemoryDispatch();
  const { clientHeight, clientWidth } = grid.current;
  const [wonCards, setWonCards] = useState(cards);
  const [showCongrats, setShowCongrats] = useState(false);

  const firstSpringRef = useRef();
  //@ts-ignore
  const { opacity, transform } = useSpring({
    ref: firstSpringRef,
    config: { ...config.wobbly, friction: 1, tension: 250 },
    from: {
      opacity: 0,
      transform: 'translate3d(-10px, 40px, 20px) scale(4) rotate(180deg)'
    },
    to: {
      opacity: showCongrats ? 1 : 0,
      transform: 'translate3d(0px, 0px, 0px) scale(1.2) rotate(0deg)'
    },
    delay: cards.length * 40
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
    delay: 5000
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
    const timeout = setTimeout(() => setWonCards([]), 1000);
    return () => clearTimeout(timeout);
  }, []);

  //@ts-ignore
  useChain([transitionRef, firstSpringRef, secondSpringRef]);

  return (
    <>
      {showCongrats && (
        <div style={{ textAlign: 'center' }}>
          <Congrats style={{ opacity, transform }}>WINNER!!!</Congrats>
          <PlayAgain
            onClick={() =>
              dispatch({ type: 'RESET', payload: { initialState } })
            }
            style={secondSpring}
          >
            Play again
          </PlayAgain>
        </div>
      )}
      {transition.map(
        ({
          item: { bgColor, isOpen, isCollected, identifier },
          key,
          props
        }: any): any => {
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
