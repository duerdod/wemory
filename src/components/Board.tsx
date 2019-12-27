import React from 'react';
import styled from 'styled-components';
import { Card } from './Card';
import { useMemoryState, MemoryCard } from '../context/memory-context';

interface ContainerProps {
  columns: number;
}

const Container = styled.div<ContainerProps>`
  padding: 2rem;
  max-width: 80em;
  margin: 0 auto;
  display: grid;
  grid-gap: 0.9rem;
  justify-content: center;
  ${({ columns = 3 }) =>
    `grid-template-columns: repeat(${Math.trunc(
      columns / 3
    )}, minmax(120px, 1fr))`};
  /* grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); */
  @media screen and (max-width: 35em) {
    grid-template-columns: repeat(3, minmax(110px, 200px));
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
    <Container columns={cards.length}>
      {cards.map((card: MemoryCard) => (
        <Card key={card.uniqueId} card={card} {...card} />
      ))}
    </Container>
  );
};
