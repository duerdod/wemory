import React from 'react';
import styled from 'styled-components';
import { TitleStyle } from './ui/TitleStyle';
import { useSpring, animated } from 'react-spring';
import { wait } from '../utils/index';
import { theme } from '../Theme';
import { useDeviceWidth } from '../hooks/useDeviceWidth';

interface IShadowCalc {
  color: string;
  number: number;
  negative?: boolean;
}

interface IChain {
  transform: string;
  textShadow?: (options: IShadowCalc) => string;
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

// Craycray = Rewrite.
export const shadow = ({ color, number, negative = false }: IShadowCalc) =>
  Array(number)
    .fill(color)
    .reduce((string, current, index) => {
      const properShadowPixel = index + 1;
      return (
        string +
        `${properShadowPixel}px ${
          negative ? '-' : ''
        }${properShadowPixel}px 0px ${current} ${
          number === properShadowPixel ? '' : ','
        }`
      );
    }, '');

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
      textShadow: shadow({ color: titleTextShadow, number: shadowCount })
    },
    to: async (next: ({ transform, textShadow }: IChain) => Promise<void>) => {
      while (1) {
        await wait(2000);
        await next({
          transform: 'rotateX(180deg) translate(2px, 6px)',
          textShadow: shadow({
            color: titleTextShadow,
            number: shadowCount,
            negative: true
          })
        });
        await wait(13000);
        await next({
          transform: 'rotateX(0deg) translate(-1px, 1px)',
          textShadow: shadow({
            color: titleTextShadow,
            number: shadowCount
          })
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
          style={i === 0 ? { textShadow, transform, marginRight: '2px' } : {}}
          className={i === 0 ? '' : 'with-shadow'}
        >
          {letter}
        </M>
      ))}
    </TitleContainer>
  );
};
