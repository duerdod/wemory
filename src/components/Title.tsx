import React from 'react';
import styled from 'styled-components';
import { TitleStyle } from './ui/TitleStyle';
import { useSpring, animated } from 'react-spring';
import { wait } from '../utils/index';
import { theme } from '../Theme';
import { useDeviceWidth } from '../hooks/useDeviceWidth';

const TitleContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  padding-top: 1rem;
  transform: skew(0deg, -2deg);
`;

const M = styled(animated.h1)`
  ${TitleStyle}
  display: inline-block;
  font-size: 9rem;

  @media screen and (max-width: 40em) {
    font-size: 5rem;
    /* letter-spacing: inherit; */
  }
`;

// Craycray = Rewrite.
export const shadow = (color: string, number: number, negative = false) =>
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

// ReactNode? Element[]? JSX.Element?!
export const Title = (): any => {
  const { isLarge } = useDeviceWidth();
  const shadowCount = isLarge ? 13 : 6;

  // @ts-ignore
  const { textShadow, transform } = useSpring({
    from: {
      transform: 'rotateX(0deg) translate(0px, 0px)',
      textShadow: shadow(theme.titleTextShadow, shadowCount)
    },
    to: async (next: any) => {
      while (1) {
        await wait(1500);
        await next({
          transform: 'rotateX(180deg) translate(0px, 7px)',
          textShadow: shadow(theme.titleTextShadow, shadowCount, true)
        });
        await wait(20000);
        await next({
          transform: 'rotateX(0deg) translate(0px, 0px)',
          textShadow: shadow(theme.titleTextShadow, shadowCount)
        });
      }
    },
    config: { tension: 240, friction: 6 }
  });

  return (
    <TitleContainer>
      {[...text].map((letter, i) => (
        <M
          key={i}
          style={i === 0 ? { textShadow, transform, marginRight: '2px' } : {}}
        >
          {letter}
        </M>
      ))}
    </TitleContainer>
  );
};

/*

    <div style={{ textAlign: 'center' }}>
      <M style={{ transform }}>M</M>
      <StyledTitle
        // size="9rem"
        onClick={() =>
          dispatch({
            type: 'INIT',
            payload: { cardType, cardCount: cards.length }
          })
        }
      >
{title}
        Emory
      </StyledTitle>
    </div>


*/
