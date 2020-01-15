import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import { Card, CardContent } from './Card';
import {
  useMemoryState,
  MemoryCard,
  useMemoryDispatch
} from '../context/memory-context';

import { WonGame } from './WonGame';
import { deviceWidth } from '../Theme';

const Container = styled.div`
  position: relative;
  /* overflow: hidden; */
  padding: 1rem 2rem;
  max-width: 80em;
  margin: 0 auto;
  display: grid;
  grid-gap: 0.9rem;
  justify-content: center;
  grid-template-columns: repeat(6, 1fr);
  ${deviceWidth.smallDown`
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  `}
`;

const Board: React.FC = () => {
  const { cards, selectedCards, isGameWon } = useMemoryState();
  const dispatch = useMemoryDispatch();
  const gridRef = useRef<HTMLDivElement | null>(null);

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

export default memo(Board);
