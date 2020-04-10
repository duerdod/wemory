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
  letter-spacing: 1px;
  text-shadow: ${coolShadow('lightgrey', 3)};
  line-height: 19px;
  width: 100px;

  &.won {
    position: relative;
    left: 95px;
    &::after {
      position: absolute;
      transition: opacity 2s ease;
      content: 'moves';
      font-size: 1rem;
      opacity: ${(p) => (p.won ? '1' : '0')};
      text-shadow: ${coolShadow('lightgrey', 1)};
      top: 24px;
      left: -9px;
    }
  }
`;

// TODO: Add types.
const Moves = () => {
  const { moves, isGameWon } = useMemoryState();
  const spring = useTransition(moves, null, {
    unique: true,
    from: { transform: 'scaleY(0.2)' },
    enter: { transform: 'scaleY(1)' },
    leave: { transform: 'scaleY(1)' },
    config: { duration: 150 },
  });

  const transform = useTransition(isGameWon, null, {
    unique: true,
    from: {
      transform: 'scale(1)',
    },
    // @ts-ignore
    enter: () => async (next) => {
      await wait(500);
      await next({ transform: 'scale(3.2)' });
    },
    leave: {
      transform: 'scale(0)',
      opacity: 0,
      position: 'absolute',
    },
    config: { friction: 14, tension: 420 },
  });

  return (
    <MovesContainer>
      {!isGameWon &&
        spring.map(({ item, props, key }) => (
          <MovesValue key={key} style={props}>
            {item}
          </MovesValue>
        ))}
      {isGameWon && (
        <>
          {transform.map(({ key, props }: any) => (
            <MovesValue key={key} style={props} className="won" won={isGameWon}>
              {moves}
            </MovesValue>
          ))}
        </>
      )}
    </MovesContainer>
  );
};

export default React.memo(Moves);
