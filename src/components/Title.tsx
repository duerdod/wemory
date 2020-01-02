import React from 'react';
import styled, { css } from 'styled-components';
import { useMemoryDispatch } from '../context/memory-context';
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
  return (
    <div style={{ textAlign: 'center' }}>
      <StyledTitle
        size="6rem"
        onClick={() =>
          dispatch({
            type: 'INIT',
            payload: { cardType: 'foods', cardCount: 12 }
          })
        }
      >
        {title}
      </StyledTitle>
    </div>
  );
};
