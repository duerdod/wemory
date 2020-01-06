import { css } from 'styled-components';
import { theme, deviceWidth } from '../../Theme';
import { coolShadow } from '../../utils/coolShadow';

export const TitleStyle = css`
  max-width: 600px;
  line-height: 3.2rem;
  text-transform: uppercase;
  letter-spacing: 12px;
  color: ${theme.titleColor};
  font-family: ${theme.fontFamily};
  cursor: pointer;
  transition: all ${theme.transition};
  margin-top: 2rem;
  font-size: 9rem;
  display: inline-block;
  will-change: transform, text-shadow;
  transform: translate3d(7px, 2px, 2px) skew(0deg, 0deg);

  &.with-shadow {
    text-shadow: ${coolShadow(theme.titleTextShadow, 13)};
  }

  &:hover {
    text-shadow: ${coolShadow(theme.titleTextShadow, 6)};
    /* transform: translate3d(7px, 2px, 2px) skew(0deg, 0deg); */
  }

  ${deviceWidth.smallDown(`
    margin-top: 1rem;
    letter-spacing: 4px;
    transform: none;
    font-size: 6rem;
    text-shadow: ${coolShadow(theme.titleTextShadow, 6)};

    &.with-shadow {
      text-shadow: ${coolShadow(theme.titleTextShadow, 6)};
    }
  `)}

    
/*
  @media screen and (max-width: 40em) {
     margin-top: 1rem;
    letter-spacing: 4px;
    transform: none;
    font-size: 6rem;
    text-shadow: ${coolShadow(theme.titleTextShadow, 6)};

    &.with-shadow {
      text-shadow: ${coolShadow(theme.titleTextShadow, 6)};
    } 
  }
  */
`;
