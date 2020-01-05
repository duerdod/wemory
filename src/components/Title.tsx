import React from 'react';
import styled, { css } from 'styled-components';
import { useMemoryDispatch, useMemoryState } from '../context/memory-context';
import { TitleStyle } from './ui/TitleStyle';

interface TitleProps {
  title: string;
  size: string;
}

interface Styled {
  size: string;
}

const StyledTitle = styled.button(
  ({ size }: Styled) => css`
    ${TitleStyle};
    font-size: ${size};
  `
);

export const Title = ({ title }: TitleProps) => {
  const dispatch = useMemoryDispatch();
  const { cards, cardType } = useMemoryState();
  return (
    <div style={{ textAlign: 'center' }}>
      <StyledTitle
        size="9rem"
        onClick={() =>
          dispatch({
            type: 'INIT',
            payload: { cardType, cardCount: cards.length }
          })
        }
      >
        {title}
      </StyledTitle>
    </div>
  );
};
