import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.section`
  padding: 0 2rem;
  margin: 0 auto;
  max-width: 80rem;
  position: relative;
`;

export const Container: React.FC = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};
