import { css } from 'styled-components';
import { theme } from '../../Theme';
import { coolShadow } from '../../utils/coolShadow';

export const TitleStyle = css`
  max-width: 600px;
  line-height: 3.2rem;
  text-transform: uppercase;
  letter-spacing: 10px;
  color: ${theme.titleColor};
  font-family: ${theme.fontFamily};
  cursor: pointer;
  transition: all ${theme.transition};
  margin-top: 2rem;

  &.with-shadow {
    text-shadow: ${coolShadow(theme.titleTextShadow, 13)};
  }

  &:hover {
    text-shadow: ${coolShadow(theme.titleTextShadow, 6)};
    transform: translate3d(7px, 2px, 2px) skew(0deg, 0deg);
  }

  @media screen and (max-width: 40em) {
    margin-top: 1rem;
    letter-spacing: 2px;
    transform: none;
    font-size: 6rem;
    text-shadow: ${coolShadow(theme.titleTextShadow, 6)};
    &:hover {
      text-shadow: initial;
      transform: none;
    }
  }
`;
