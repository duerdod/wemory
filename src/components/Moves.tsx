import React from 'react';
import styled from 'styled-components';
import { useMemoryState } from '../context/memory-context';
import { useTransition, animated, useSpring, config } from 'react-spring';

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
  font-size: 3.1rem;
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
  /* top: 65px; */
`;

const Moves = () => {
  const { moves, isGameWon } = useMemoryState();
  const spring = useTransition(moves, null, {
    from: { transform: 'translate3d(0, 40px, 0) scale(0.8)' },
    enter: { transform: 'translate3d(0, 0, 0) scale(1)' },
    leave: { transform: 'translate3d(0, 0, 0) scale(1)' },
    config: { duration: 150 }
  });

  const transform = useSpring({
    from: {
      transform: 'scale(1) rotateY(0deg)'
    },
    to: {
      transform: `scale(3.2) rotateY(${36e2})`
    },
    config: { ...config.wobbly, duration: 1500 },
    delay: 3000
  });

  const opacity = useSpring({
    from: { top: 0, opacity: 0 },
    to: { top: 65, opacity: 1 }
  });

  return (
    <MovesContainer>
      {!isGameWon ? (
        spring.map(({ item, props, key }) => (
          <MovesValue key={key} style={props}>
            {item}
          </MovesValue>
        ))
      ) : (
        <>
          <MovesValue style={transform}>{moves}</MovesValue>
          <Text style={opacity}>moves</Text>
        </>
      )}
    </MovesContainer>
  );
};

export default React.memo(Moves);
