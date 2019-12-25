import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useMemoryState, MemoryCard } from '../context/memory-context';

const Container = styled.div`
  padding: 2rem;
  display: grid;
  grid-gap: 0.6rem;
  grid-template-columns: repeat(3, minmax(120px, 250px));
  @media screen and (max-width: 35em) {
    grid-template-columns: repeat(2, minmax(120px, 250px));
  }
`;

export const Board: React.FC = () => {
  const { cards } = useMemoryState();

  return (
    <Container>
      {cards.map((card: MemoryCard) => (
        <Card key={card.uniqueId} {...card} />
      ))}
    </Container>
  );
};
