import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMemoryState } from '../context/memory-context';
import { useTransition, animated } from 'react-spring';

const MovesValue = styled(animated.h3)`
  text-align: center;
  color: whitesmoke;
  font-size: 4rem;

  /* position: absolute; */
`;

export const Moves = () => {
  const { moves } = useMemoryState();
  const spring = useTransition(moves, moves, {
    unique: true,
    from: { transform: 'translate3d(0, 20px, 0) scale(0.8)' },
    enter: { transform: 'translate3d(0, 0, 0) scale(1)' },
    leave: { transform: 'translate3d(0, 0, 0) scale(1)' },
    config: { duration: 150 }
  });

  return (
    <MovesValue>
      {spring.map(({ item, props, key }) => {
        return (
          <MovesValue key={key} style={props}>
            {item}
          </MovesValue>
        );
      })}
    </MovesValue>
  );
};
