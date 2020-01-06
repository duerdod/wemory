import React from 'react';
import styled from 'styled-components';
import { TitleStyle } from './ui/TitleStyle';
import { useSpring, animated } from 'react-spring';
import { wait, coolShadow } from '../utils/index';
import { theme } from '../Theme';
import { useDeviceWidth } from '../hooks/useDeviceWidth';

interface IAnimationCalc {
  transform: string;
  // Why no params?
  textShadow: () => string;
}

const TitleContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  padding-top: 1rem;
  transform: skew(0deg, -2deg);
`;

const M = styled(animated.h1)`
  ${TitleStyle}
`;

const text = 'MEMORY';
const { titleTextShadow } = theme;

// ReactNode? Element[]? JSX.Element?!
export const Title = (): any => {
  const { windowSize } = useDeviceWidth();

  // This isn't really working because the spring isn't updated.
  const shadowCount = windowSize.innerWidth > 600 ? 13 : 6;

  // @ts-ignore
  const { textShadow, transform } = useSpring({
    from: {
      transform: 'rotateX(0deg) translate(-1px, 1px)',
      textShadow: coolShadow(titleTextShadow, shadowCount)
    },
    to: async (
      next: ({ transform, textShadow }: IAnimationCalc) => Promise<void>
    ) => {
      while (1) {
        await wait(2000);
        await next({
          transform: 'rotateX(180deg) translate(0px, 6px)',
          textShadow: coolShadow(titleTextShadow, shadowCount, true)
        });
        await wait(13000);
        await next({
          transform: 'rotateX(0deg) translate(-1px, 1px)',
          textShadow: coolShadow(titleTextShadow, shadowCount)
        });
      }
    },
    config: { tension: 240, friction: 8 }
    // delay: 200000
  });

  return (
    <TitleContainer>
      {[...text].map((letter, i) => (
        <M
          key={i}
          style={i === 0 ? { textShadow, transform } : {}}
          className={i === 0 ? '' : 'with-shadow'}
        >
          {letter}
        </M>
      ))}
    </TitleContainer>
  );
};
