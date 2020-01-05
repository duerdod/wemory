import { css } from 'styled-components';
import { theme } from '../../Theme';
import { coolShadow } from '../../utils/coolShadow';

export const TitleStyle = css`
  margin: 0.5rem auto 0rem auto;
  padding: 2rem;
  transform: skew(0deg, -2deg);
  max-width: 600px;
  line-height: 3.2rem;
  text-transform: uppercase;
  letter-spacing: 10px;
  color: ${theme.titleColor};
  font-family: ${theme.fontFamily};
  cursor: pointer;
  text-shadow: ${coolShadow(theme.titleTextShadow, 13)};
  transition: all ${theme.transition};
  margin-top: 2rem;

  &:hover {
    text-shadow: ${coolShadow(theme.titleTextShadow, 6)};
    transform: translate3d(7px, 2px, 2px) skew(0deg, 0deg);
  }

  @media screen and (max-width: 40em) {
    margin-top: 1rem;
    letter-spacing: 2px;
    transform: none;
    font-size: 6rem;
    text-shadow: ${coolShadow(theme.titleTextShadow, 7)};
  }
`;
