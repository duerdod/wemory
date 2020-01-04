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
  text-shadow: ${coolShadow(theme.titleTextShadow, 15)};
  transition: all ${theme.transition};

  @media screen and (max-width: 40em) {
    font-size: 3.6rem;
    letter-spacing: 2px;
    transform: none;
    text-shadow: ${coolShadow(theme.titleTextShadow, 7)};
  }
`;
