import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useMemoryState, MemoryCard } from '../context/memory-context';

const Container = styled.div``;

export const Board: React.FC = () => {
  const { cards } = useMemoryState();
  return (
    <Container>
      {cards.map((card: MemoryCard) => (
        <Card {...card} />
      ))}
    </Container>
  );
};
