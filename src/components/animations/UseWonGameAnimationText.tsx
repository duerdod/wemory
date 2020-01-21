import { useRef, MutableRefObject } from 'react';
import { config, useSpring, UseSpringBaseProps } from 'react-spring';
import { useMemoryState } from '../../context/memory-context';

// SPECIFICS!
export const UseWonGameAnimationText = (): any => {
  const { cards } = useMemoryState();

  const firstSpringRef: MutableRefObject<any> = useRef();
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

  const secondSpringRef: MutableRefObject<any> = useRef();
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

  const thirdSpringRef: MutableRefObject<any> = useRef();
  const thirdSpring = useSpring({
    ref: thirdSpringRef,
    config: { ...config.stiff, duration: 400 },
    from: {
      textShadow: 11
    },
    to: {
      textShadow: 110
    },
    delay: 3200
  });

  return [
    { firstSpringRef, secondSpringRef, thirdSpringRef },
    { firstSpring, secondSpring, thirdSpring }
  ] as [
    {
      firstSpringRef?: MutableRefObject<any>;
      secondSpringRef?: MutableRefObject<any>;
      thirdSpringRef?: MutableRefObject<any>;
    },
    {
      firstSpring: UseSpringBaseProps;
      secondSpring: UseSpringBaseProps;
      thirdSpring: UseSpringBaseProps;
    }
  ];
};
