import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../Theme';

type Type = 'submit' | 'button';

type Color = 'success' | 'disappointment';

const padding = {
  small: '0.9rem 0.8rem',
  medium: '0.9rem 1rem',
  large: '0.9rem 2.5rem'
};

const hslBackground = {
  hsl: (hue: string, light: string) => `hsl(${hue}, 100%, ${light}%)`
};

interface ButtonProps {
  children: string | ReactNode;
  type: Type;
  color?: Color;
  size: keyof typeof padding;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
    background: ${hslBackground.hsl('125', '44.5')};
    border: 3px solid ${hslBackground.hsl('125', '43.5')};
    &:hover {
      background: ${hslBackground.hsl('125', '43.5')};
      border: 3px solid ${hslBackground.hsl('125', '43.5')};
    }`
      : ''}

    ${color === 'disappointment'
      ? `
    background: ${hslBackground.hsl('354', '47.3')};
    border: 3px solid ${hslBackground.hsl('354', '44.3')};
    &:hover {
      background: ${hslBackground.hsl('355', '41.8')};
      border: 3px solid ${hslBackground.hsl('355', '37.8')};
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
