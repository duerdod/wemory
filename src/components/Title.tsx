import React from 'react';
import styled, { css } from 'styled-components';
import { useMemoryDispatch, initialState } from '../context/memory-context';
import { theme } from '../Theme';

interface TitleProps {
  title: string;
  size: string;
}

interface Styled {
  size: string;
}

const StyledTitle = styled.button(
  ({ size }: Styled) => css`
    font-size: ${size};
    font-weight: 800;
    margin: 2.5rem auto 0.5rem auto;
    text-shadow: 3px 3px 0 rgba(142, 0, 107, 0.3),
      5px 5px 0 rgba(142, 0, 107, 0.1);
    transform: skew(0deg, -2deg);
    max-width: 600px;
    line-height: 3.2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: ${theme.titleColor};
    font-family: ${theme.fontFamily};
    cursor: pointer;

    @media screen and (max-width: 40em) {
      font-size: 4rem;
    }
  `
);

export const Title = ({ title }: TitleProps) => {
  const dispatch = useMemoryDispatch();
  return (
    <div style={{ textAlign: 'center' }}>
      <StyledTitle
        size="6rem"
        onClick={() => dispatch({ type: 'RESET', payload: { initialState } })}
      >
        {title}
      </StyledTitle>
    </div>
  );
};
