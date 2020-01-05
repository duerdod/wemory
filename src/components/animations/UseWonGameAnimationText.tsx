import { useRef } from 'react';
import { config, useSpring } from 'react-spring';
import { useMemoryState } from '../../context/memory-context';

export const UseWonGameAnimationText = (): any => {
  const { cards } = useMemoryState();

  const firstSpringRef = useRef();
  //@ts-ignore
  const firstSpring = useSpring({
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

  return [
    { firstSpringRef, secondSpringRef },
    { firstSpring, secondSpring }
  ];
};
