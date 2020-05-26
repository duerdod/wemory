import React from 'react'
import { animated, useSpring } from 'react-spring'
import styled from 'styled-components'
import { theme } from '../Theme'
import { coolShadow, wait } from '../utils/index'
import { TitleStyle } from './ui/TitleStyle'

interface IAnimationCalc {
  transform: string
  // Why no params?
  textShadow: () => string
}

const TitleContainer = styled.div`
  margin: 0 auto;
  text-align: center;
  padding-top: 1rem;
  transform: skew(0deg, -2deg);
`

const M = styled(animated.h1)`
  ${TitleStyle}
`

const text = 'MEMORY'
const { titleTextShadow } = theme

// ReactNode? Element[]? JSX.Element?!
export const Title = (): any => {
  // @ts-ignore
  const { textShadow, transform } = useSpring({
    from: {
      transform: 'rotateX(0deg) translate(-1px, 1px)',
      textShadow: coolShadow(titleTextShadow, 10),
    },
    to: async (
      next: ({ transform, textShadow }: IAnimationCalc) => Promise<void>
    ) => {
      while (1) {
        await wait(2000)
        await next({
          transform: 'rotateX(180deg) translate(0px, 6px)',
          textShadow: coolShadow(titleTextShadow, 10, true),
        })
        await wait(13000)
        await next({
          transform: 'rotateX(0deg) translate(-1px, 1px)',
          textShadow: coolShadow(titleTextShadow, 10),
        })
      }
    },
    config: { tension: 240, friction: 8 },
  })

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
  )
}
