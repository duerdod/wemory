import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  MemoryCard,
  useMemoryDispatch,
  useMemoryState,
} from '../context/memory-context';
import { deviceWidth } from '../Theme';
import { hasLength, wait } from '../utils/index';
import { Card, CardContent } from './Card';
import { WonGame } from './WonGame';

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
`;

const Board: React.FC = () => {
  const { cards, selectedCards, isGameWon } = useMemoryState();
  const dispatch = useMemoryDispatch();
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (hasLength(selectedCards, 2)) {
      wait(500).then((): void => {
        dispatch({ type: 'CHECK_MATCH', payload: { selectedCards } });
      });
    }
  }, [selectedCards, cards, dispatch]);

  const selectCard = React.useCallback(
    (e, card) => {
      e.preventDefault();
      dispatch({
        type: 'SELECT',
        payload: {
          selectedCard: card,
        },
      });
    },
    [dispatch]
  );

  useEffect(() => {
    // Because this never unmounts.
    if (isGameWon) {
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }

    return () => document.body.classList.remove('scroll-lock');
  }, [isGameWon]);

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
  );
};

export default memo(Board);
