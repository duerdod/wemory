import React from 'react';
import styled from 'styled-components';
import { useMemoryState } from '../context/memory-context';
import { useTransition, animated, useSpring, config } from 'react-spring';

import { coolShadow } from '../utils/coolShadow';

const MovesContainer = styled.div`
  position: absolute;
  bottom: -10px;
  right: 40px;
  z-index: 1;
`;

const MovesValue = styled(animated.h3)`
  color: whitesmoke;
  font-size: 3.1rem;
  letter-spacing: 3px;
  text-shadow: ${coolShadow('lightgrey', 3)};
`;

const Moves = () => {
  const { moves, isGameWon } = useMemoryState();
  const spring = useTransition(moves, null, {
    from: { transform: 'translate3d(0, 40px, 0) scale(0.8)' },
    enter: { transform: 'translate3d(0, 0, 0) scale(1)' },
    leave: { transform: 'translate3d(0, 0, 0) scale(1)' },
    config: { duration: 150 }
  });

  const gameWonSpring = useSpring({
    from: {
      transform: 'scale(1) rotateY(0deg)'
    },
    to: {
      transform: `scale(2.7) rotateY(${36e2})`
    },
    config: { ...config.wobbly, duration: 1500 },
    delay: 3000
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
        <MovesValue style={gameWonSpring}>{moves}</MovesValue>
      )}
    </MovesContainer>
  );
};

export default React.memo(Moves);
