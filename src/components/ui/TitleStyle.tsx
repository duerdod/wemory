import { css } from 'styled-components';
import { theme } from '../../Theme';

export const TitleStyle = css`
  font-weight: 800;
  margin: 0.5rem auto 0rem auto;
  padding: 2rem;
  transform: skew(0deg, -2deg);
  max-width: 600px;
  line-height: 3.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${theme.titleColor};
  font-family: ${theme.fontFamily};
  cursor: pointer;

  text-shadow: 1px 1px 0px ${theme.titleTextShadow},
    2px 2px 0px ${theme.titleTextShadow}, 3px 3px 0px ${theme.titleTextShadow},
    4px 4px 0px ${theme.titleTextShadow}, 5px 5px 0px ${theme.titleTextShadow},
    6px 6px 0px ${theme.titleTextShadow};

  @media screen and (max-width: 40em) {
    font-size: 4rem;
    transform: none;
  }
`;
