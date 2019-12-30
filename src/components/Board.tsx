import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useMemoryState, MemoryCard } from '../context/memory-context';

const Container = styled.div`
  padding: 2rem;
  max-width: 80em;
  margin: 0 auto;
  display: grid;
  grid-gap: 0.9rem;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  @media screen and (max-width: 35em) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 60px));
    grid-template-rows: repeat(9, 60px);
  }
`;

export const Board: React.FC = () => {
  const { cards } = useMemoryState();

  /*

  TODO: Use when card count is a setting.
  const deck = React.useMemo(
    () =>
      cards.reduce(
        (arr: MemoryCard[], current: MemoryCard) =>
          current.memoryId <= 99 ? [...arr, current] : arr,
        []
      ),
    [cards]
  );

  */

  return (
    <Container>
      {cards.map((card: MemoryCard) => (
        <Card key={card.uniqueId} card={card} {...card} />
      ))}
    </Container>
  );
};
