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
    text-shadow: ${coolShadow(theme.titleTextShadow, 10)};
  }

  &:hover {
    text-shadow: ${coolShadow(theme.titleTextShadow, 6)};
    /* transform: translate3d(7px, 2px, 2px) skew(0deg, 0deg); */
  }

  ${deviceWidth.smallDown(`
    margin-top: 1rem;
    letter-spacing: 10px;
    transform: none;
    font-size: 4.5rem;
    text-shadow: ${coolShadow(theme.titleTextShadow, 10)};

    &.with-shadow {
      text-shadow: ${coolShadow(theme.titleTextShadow, 10)};
    }
  `)}
`;
