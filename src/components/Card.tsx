import React from 'react';
import styled from 'styled-components';
import { MemoryCard } from '../context/memory-context';

const StyledCard = styled.div`
  height: 200px;
  width: 200px;
`;

export const Card = ({ id, color }: MemoryCard) => {
  return <StyledCard>'Card'</StyledCard>;
};
