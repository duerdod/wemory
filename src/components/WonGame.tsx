import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { useChain, animated, interpolate } from 'react-spring'
import { useMemoryState, useMemoryDispatch } from '../context/memory-context'
import { StyledCard } from './Card'
import { theme, deviceWidth } from '../Theme'
import { Button } from './ui/Button'
import { adjustLightness, coolShadow } from '../utils/index'

import { UseWonGameAnimationText } from './animations/UseWonGameAnimationText'
import { useWonGameCardsAnimation } from './animations/useWonGameCardsAnimation'

// The complete component is bullcrap.

const CongratsContainer = styled.div`
  grid-column: 1 / 8;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`

const Congrats = styled(animated.h2)`
  font-size: 5rem;
  padding: 0 0 1rem 0;
  cursor: auto;
  text-align: center;
  z-index: 98;
  transition: text-shadow ${theme.transition};
  color: ${theme.secondaryColor};
  text-shadow: ${coolShadow(adjustLightness(theme.secondaryColor, 20), 11)};

  &.second {
    font-size: 2.5rem;
    padding-bottom: 1.5rem;
    padding-top: 0;
    z-index: 99;
    color: ${theme.titleColor};
    text-shadow: ${coolShadow(adjustLightness(theme.titleColor, 20), 3)};
  }

  ${deviceWidth.smallDown`
    font-size: 3rem;
    &.second {
      font-size: 1.5rem;
    }
    `}
`

const ButtonContainer = styled(animated.div)`
  z-index: 999;
  ${deviceWidth.smallDown`
    font-size: 1rem;
    padding: 0;
    button {
      white-space: nowrap;
      font-size: 1rem;
    }
  `}
`

interface TransitionProps {
  item: {
    bgColor: string
    isOpen: boolean
    isCollected: boolean
    identifier: string
  }
  key: string
  props: {}
}

// TODO: Add types.
export const WonGame: React.FC<{
  grid: React.MutableRefObject<any>
}> = ({ grid }): any => {
  const { cards, cardType } = useMemoryState()

  const send = useMemoryDispatch()

  const [
    { firstSpringRef, secondSpringRef, thirdSpringRef },
    {
      firstSpring: { opacity, rotate, scale },
      secondSpring,
      thirdSpring: { textShadow },
    },
  ] = UseWonGameAnimationText()

  const { transitionRef, transition, showCongrats } = useWonGameCardsAnimation({
    grid,
  })

  const handleClick = useCallback(
    () =>
      send({
        type: 'RESET',
        gameSettings: { cardCount: cards.length, cardType },
      }),
    [send, cards, cardType]
  )

  useChain([transitionRef, firstSpringRef, secondSpringRef, thirdSpringRef])

  return (
    <>
      {showCongrats && (
        <CongratsContainer>
          <Congrats
            style={{
              opacity,
              textShadow: textShadow.interpolate(
                (amount: number) =>
                  `${coolShadow(
                    adjustLightness(theme.secondaryColor, 20),
                    Math.trunc(amount)
                  )}`
              ),
              transform: interpolate(
                [rotate, scale],
                (r, s) => `rotate(-${r}turn) scale(${s})`
              ),
            }}
          >
            WINNER!!!
          </Congrats>
          <ButtonContainer>
            <Congrats
              className="second"
              style={{
                opacity,
                transform: interpolate(
                  [rotate, scale],
                  (r, s) => `rotateY(${r + 10}turn) scale(${s})`
                ),
              }}
            >
              YOU ARE AMAZING
            </Congrats>
          </ButtonContainer>
          <ButtonContainer style={secondSpring}>
            <Button
              size="large"
              type="button"
              color="success"
              onClick={handleClick}
            >
              <span>Play again</span>
            </Button>
          </ButtonContainer>
        </CongratsContainer>
      )}
      {transition.map(
        ({
          item: { bgColor, isOpen, isCollected, identifier },
          key,
          props,
        }: TransitionProps) => {
          return (
            <StyledCard
              key={key}
              style={props}
              background={bgColor}
              discovered={isCollected || isOpen}
            >
              {identifier && (
                <span>{(isOpen || isCollected) && identifier}</span>
              )}
            </StyledCard>
          )
        }
      )}
    </>
  )
}
