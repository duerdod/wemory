import React, { ReactNode, CSSProperties, MutableRefObject } from 'react';
import styled, { css } from 'styled-components';
import { theme } from '../../Theme';
import { adjustLightness } from '../../utils/index';

// This is all crap.
type Type = 'submit' | 'button';

type Color = 'success' | 'disappointment' | 'neutral';

interface ButtonProps {
  children: string | ReactNode;
  type: Type;
  color?: Color;
  size: keyof typeof padding;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
  ref?: MutableRefObject<any>;
}

interface StyledButtonProps {
  size: keyof typeof padding;
  color: keyof typeof buttonColors;
  hsl?: (hsl: string, string: string) => string;
}

const buttonColors = {
  success: theme.titleColor,
  disappointment: theme.backgroundColor,
  neutral: theme.secondaryColor
};

const padding = {
  small: '0.9rem 0.8rem',
  medium: '0.9rem 1rem',
  large: '0.9rem 3.4rem'
};

const StyledButton = styled.button(
  ({ size, color }: StyledButtonProps) => css`
    color: whitesmoke;
    font-size: 1.8rem;
    letter-spacing: 2px;
    outline: 0;
    text-transform: uppercase;
    padding: ${padding[size]};
    background: ${adjustLightness(buttonColors[color], 0)};
    box-shadow: inset 0 0 0 2px ${adjustLightness(buttonColors[color], 7)};
    border-radius: 0.55rem;
    transform-style: preserve-3d;
    transition: transform 150ms ${theme.transition}, filter 150ms ${
    theme.transition
  };

    &::before {
      content: 'HUGS ME';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${adjustLightness(buttonColors[color], 5)};
      box-shadow: inset 0 0 0 2px ${adjustLightness(buttonColors[color], 7)};
      border-radius: inherit;
      transform: translate3d(0, 0.75rem, -1rem);
      filter: drop-shadow(
        2px 2px 6px ${adjustLightness(buttonColors[color], 1)}
      );
      transition: transform 150ms ${theme.transition}, filter 150ms ${
    theme.transition
  };

    }

    &:hover {
      background: ${adjustLightness(buttonColors[color], -3)};
      transform: translate(0, 0.25rem);

      &::before {
        transform: translate3d(0, 0.5rem, -1rem);
        filter: drop-shadow(
        2px 1px 4px ${adjustLightness(buttonColors[color], 1)}
      );

    }

    &:active {
      background: ${adjustLightness(buttonColors[color], -3)};
      transform: translate(0em, 0.75rem);
      outline: none;

      &::before {
        transform: translate3d(0, 0, -1rem);
        filter: drop-shadow(
        0px 0px 0px ${adjustLightness(buttonColors[color], 1)}
      );

    }
  }

  button:focus {outline:0;}


  `
);

export const Button = ({
  children,
  type,
  onClick,
  style,
  size = 'medium',
  color = 'success'
}: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      style={style}
      size={size}
      color={color}
    >
      {children}
    </StyledButton>
  );
};
