import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useMemoryState, MemoryCard } from '../context/memory-context';

interface ExtendedMemoryCard {
  card: MemoryCard;
}

const Container = styled.div`
  padding: 2rem;
  display: grid;
  grid-gap: 0.6rem;
  justify-content: center;
  grid-template-columns: repeat(3, minmax(120px, 250px));
  @media screen and (max-width: 35em) {
    grid-template-columns: repeat(2, minmax(120px, 250px));
  }
`;

export const Board: React.FC = () => {
  const { cards } = useMemoryState();
  // console.table(cards);
  return (
    <Container>
      {cards.map((card: MemoryCard) => (
        <Card key={card.uniqueId} card={card} {...card} />
      ))}
    </Container>
  );
};
