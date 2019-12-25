import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useMemoryState, MemoryCard } from '../context/memory-context';

const Container = styled.div`
  padding: 2rem;
  display: grid;
  grid-gap: 0.6rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

export const Board: React.FC = () => {
  const { cards } = useMemoryState();
  return (
    <Container>
      {cards.map((card: MemoryCard) => (
        <Card key={card.id} {...card} />
      ))}
    </Container>
  );
};
