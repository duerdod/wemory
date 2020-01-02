import React, { ReactNode, CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../Theme';
import { darken } from '../../utils/index';
// This is crap.

type Type = 'submit' | 'button';

type Color = 'success' | 'disappointment';

const padding = {
  small: '0.9rem 0.8rem',
  medium: '0.9rem 1rem',
  large: '0.9rem 2.5rem'
};

interface ButtonProps {
  children: string | ReactNode;
  type: Type;
  color?: Color;
  size: keyof typeof padding;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
}

interface StyledButtonProps {
  size: keyof typeof padding;
  color: Color;
  hsl?: (hsl: string, string: string) => string;
}

const StyledButton = styled.button(
  ({ size, color }: StyledButtonProps) => css`
    margin: 0.5rem;
    border-radius: 4px;
    transition: ${theme.transition};
    padding: ${padding[size]};
    color: whitesmoke;
    font-size: 1.2rem;

    ${color === 'success'
      ? `
    background: ${theme.titleColor};
    border: 3px solid ${darken(theme.titleColor, 1)};
    box-shadow: 0 3px 5px -1px ${darken(theme.titleColor, 1)};
    &:hover {
      background: ${darken(theme.titleColor, 3)};
      border: 3px solid ${darken(theme.titleColor, 2)};
      box-shadow: 0 2px 2px 0px ${darken(theme.titleColor, 5)};
    }`
      : ''}

    ${color === 'disappointment'
      ? `
    background: ${theme.backgroundColor};
    border: 3px solid ${darken(theme.backgroundColor, 1)};
    box-shadow: 0 3px 5px -1px ${darken(theme.backgroundColor, 1)};
    &:hover {
      background: ${darken(theme.backgroundColor, 3)};
      border: 3px solid ${darken(theme.backgroundColor, 2)};
      box-shadow: 0 3px 5px -1px ${darken(theme.backgroundColor, 2)};
    }`
      : ''}
  `
);

export const Button = ({
  children,
  type,
  onClick,
  size = 'medium',
  color = 'success'
}: ButtonProps) => {
  return (
    <StyledButton onClick={onClick} type={type} size={size} color={color}>
      {children}
    </StyledButton>
  );
};
