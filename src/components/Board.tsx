import React, { memo, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import {
  MemoryCard,
  useMemoryDispatch,
  useMemoryState,
} from '../context/memory-context'
import { deviceWidth } from '../Theme'
import { Card, CardContent } from './Card'
import { WonGame } from './WonGame'

const Container = styled.div`
  position: relative;
  padding: 1.5rem 2rem;
  max-width: 80em;
  margin: 0 auto;
  display: grid;
  grid-gap: 0.9rem;
  justify-content: center;
  grid-template-columns: repeat(6, 1fr);
  ${deviceWidth.smallDown`
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  `}
`

const Board: React.FC = () => {
  const { cards, isGameWon } = useMemoryState()
  const send = useMemoryDispatch()

  const gridRef = useRef<HTMLDivElement | null>(null)

  const selectCard = useCallback(
    (_, card) => send({ type: 'SELECT_CARD', card }),
    [send]
  )

  useEffect(() => {
    if (isGameWon) {
      document.body.classList.add('scroll-lock')
    }

    return () => document.body.classList.remove('scroll-lock')
  }, [isGameWon])

  return (
    <Container ref={gridRef}>
      {isGameWon ? (
        <WonGame grid={gridRef} />
      ) : (
        cards.map((card: MemoryCard) => (
          <Card key={card.uniqueId} card={card} {...{ selectCard, ...card }}>
            <CardContent {...card} />
          </Card>
        ))
      )}
    </Container>
  )
}

export default memo(Board)
