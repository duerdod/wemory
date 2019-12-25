import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { Card } from './Card';
import { useMemoryState, MemoryCard } from '../context/memory-context';

const Container = styled.div`
  padding: 2rem;
  display: grid;
  grid-gap: 0.6rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export const Board: React.FC = () => {
  const { cards, selectedCards } = useMemoryState();

  console.table(selectedCards);
  return (
    <Container>
      {cards.map((card: MemoryCard) => (
        <Card key={uuid()} {...card} />
      ))}

      {selectedCards.map((card: MemoryCard) => (
        <Card key={card.id} {...card} />
      ))}
    </Container>
  );
};
