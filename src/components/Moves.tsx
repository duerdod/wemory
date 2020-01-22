import React from 'react';
import styled from 'styled-components';
import { useMemoryState } from '../context/memory-context';
import { useTransition, animated, useSpring } from 'react-spring';

import { coolShadow } from '../utils/coolShadow';

const MovesContainer = styled.div`
  z-index: 1;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MovesValue = styled(animated.h3)`
  color: whitesmoke;
  font-size: 3.8rem;
  letter-spacing: 3px;
  text-shadow: ${coolShadow('lightgrey', 3)};
  line-height: 19px;
`;

const Text = styled(animated.p)`
  font-size: 2rem;
  text-shadow: none;
  color: whitesmoke;
  transition: opacity 0.2s ease;
  position: absolute;
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
    enter: {
      transform: 'scale(3.2) rotateY(720deg)'
    },
    leave: {
      transform: 'scale(0) rotateY(720deg)',
      opacity: 0,
      position: 'absolute'
    },
    delay: 3000
  });

  const opacity = useSpring({
    from: { top: '0px', opacity: isGameWon ? '1' : '0' },
    to: { top: '65px', opacity: isGameWon ? '1' : '0' }
  });

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
          {transform.map(({ item, key, props }) => (
            <MovesValue key={key} style={props}>
              {moves}
            </MovesValue>
          ))}
          <Text style={opacity}>moves</Text>
        </>
      )}
    </MovesContainer>
  );
};

export default Moves;
