import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Card, CardContent } from './Card';
import {
  useMemoryState,
  MemoryCard,
  useMemoryDispatch
} from '../context/memory-context';

import { WonGame } from './WonGame';

const Container = styled.div`
  position: relative;
  overflow: hidden;
  padding: 2rem;
  max-width: 80em;
  margin: 0 auto;
  display: grid;
  grid-gap: 0.9rem;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  @media screen and (max-width: 35em) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    grid-template-rows: repeat(9, 60px);
  }
`;

export const Board: React.FC = () => {
  const { cards, selectedCards, isGameWon } = useMemoryState();
  const dispatch = useMemoryDispatch();
  const gridRef = useRef(null);

  // useEffect(() => )

  useEffect(() => {
    if (selectedCards.length >= 2) {
      dispatch({ type: 'TRY_WIN' });
    }
  }, [selectedCards, dispatch]);

  return (
    <Container ref={gridRef}>
      {isGameWon ? (
        <WonGame grid={gridRef} />
      ) : (
        cards.map((card: MemoryCard) => (
          <Card key={card.uniqueId} card={card} {...card}>
            <CardContent {...card} />
          </Card>
        ))
      )}
    </Container>
  );
};
