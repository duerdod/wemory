import React from 'react';
import styled from 'styled-components';
import { useMemoryState } from '../context/memory-context';
import { useTransition, animated } from 'react-spring';
import { theme } from '../Theme';

import { coolShadow } from '../utils/coolShadow';

const MovesContainer = styled.div`
  position: absolute;
  bottom: -10px;
  right: 30px;
  z-index: 1;
`;

const MovesValue = styled(animated.h3)`
  text-align: center;
  color: whitesmoke;
  font-size: 3.1rem;
  letter-spacing: 3px;
  text-shadow: ${coolShadow('lightgrey', 3)};
`;

const Moves = () => {
  const { moves } = useMemoryState();
  const spring = useTransition(moves, moves, {
    unique: true,
    from: { transform: 'translate3d(0, 40px, 0) scale(0.8)' },
    enter: { transform: 'translate3d(0, 0, 0) scale(1)' },
    leave: { transform: 'translate3d(0, 0, 0) scale(1)' },
    config: { duration: 150 }
  });

  return (
    <MovesContainer>
      {spring.map(({ item, props, key }) => (
        <MovesValue key={key} style={props}>
          {item}
        </MovesValue>
      ))}
    </MovesContainer>
  );
};

export default React.memo(Moves);
