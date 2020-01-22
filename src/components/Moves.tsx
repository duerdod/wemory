import React from 'react';
import { animated, useTransition } from 'react-spring';
import styled from 'styled-components';
import { useMemoryState } from '../context/memory-context';
import { coolShadow, wait } from '../utils/index';

const MovesContainer = styled.div`
  z-index: 1;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface MovesValueProps {
  won?: boolean;
}

const MovesValue = styled(animated.h3)<MovesValueProps>`
  color: whitesmoke;
  font-size: 3.8rem;
  letter-spacing: 3px;
  text-shadow: ${coolShadow('lightgrey', 3)};
  line-height: 19px;

  /* &.won {
    position: relative;
    &::after {
      position: absolute;
      transition: opacity 2s ease;
      right: -65px;
      content: 'moves';
      font-size: 1rem;
      opacity: ${p => (p.won ? '1' : '0')};
    }
  } */
`;

const Moves = () => {
  const { moves, isGameWon } = useMemoryState();
  const spring = useTransition(moves, null, {
    unique: true,
    from: { transform: 'scaleY(0.2)' },
    enter: { transform: 'scaleY(1)' },
    leave: { transform: 'scaleY(1)' },
    config: { duration: 150 }
  });

  const transform = useTransition(isGameWon, null, {
    unique: true,
    from: {
      transform: 'scale(1) rotateY(0deg)'
    },
    // @ts-ignore
    enter: () => async next => {
      await wait(4000);
      await next({ transform: 'scale(3.2) rotateY(720deg)' });
    },
    leave: {
      transform: 'scale(0) rotateY(720deg)',
      opacity: 0,
      position: 'absolute'
    },
    config: { friction: 12, tension: 420 }
  });

  /*
  const opacity = useSpring({
    to: { top: isGameWon ? '65px' : '0px', opacity: isGameWon ? '1' : '0' },
    config: { duration: 200 },
    delay: 4000
  });

  */

  return (
    <MovesContainer>
      {!isGameWon &&
        spring.map(({ item, props, key }) => (
          <MovesValue key={key} style={props} className="prupp">
            {item}
          </MovesValue>
        ))}
      {isGameWon && (
        <>
          {transform.map(({ item, key, props }: any) => (
            <MovesValue key={key} style={props} className="won" won={isGameWon}>
              {moves}
            </MovesValue>
          ))}
          {/* <Text style={opacity}>moves</Text> */}
        </>
      )}
    </MovesContainer>
  );
};

export default Moves;
