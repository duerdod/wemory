import React from 'react';
import styled from 'styled-components';
import { MaxWidth } from './ui/MaxWidth';

const StyledContainer = styled.div`
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    margin: 1rem;
  }
`;

export const Container: React.FC = ({ children }) => (
  <MaxWidth>
    <StyledContainer>{children}</StyledContainer>
  </MaxWidth>
);
