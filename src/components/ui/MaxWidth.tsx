import React from 'react';
import styled from 'styled-components';

const StyledMaxWidth = styled.section`
  padding: 0 2rem;
  margin: 0 auto;
  max-width: 80rem;
  position: relative;
`;

export const MaxWidth: React.FC = ({ children }) => (
  <StyledMaxWidth>{children}</StyledMaxWidth>
);
