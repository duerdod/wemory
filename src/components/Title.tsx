import React from 'react';
import styled from 'styled-components';
import { useMemoryDispatch, initialState } from '../context/memory-context';

interface TitleProps {
  title: string;
}

const StyledTitle = styled.h1`
  font-size: 3.4rem;
  text-align: center;
  margin: 0;
  font-weight: 800;
  margin: 2.5rem auto 0.5rem auto;
  text-shadow: 3px 3px 0 rgba(142, 0, 107, 0.3),
    5px 5px 0 rgba(142, 0, 107, 0.1);
  transform: skew(0deg, -2deg);
  max-width: 600px;
  line-height: 3.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${p => p.theme.titleColor};
  font-family: ${p => p.theme.fontFamily};
  cursor: pointer;
`;

export const Title = ({ title }: TitleProps) => {
  const dispatch = useMemoryDispatch();
  return (
    <StyledTitle
      onClick={() => dispatch({ type: 'RESET', payload: { initialState } })}
    >
      {title}
    </StyledTitle>
  );
};
