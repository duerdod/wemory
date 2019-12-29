import { createGlobalStyle } from 'styled-components';

export const theme = {
  fontFamily: 'Bowlby One SC, sans-serif',
  fontWeight: ['400', '900'],
  backgroundColor: 'rgb(105, 87, 152)',
  cardColor: 'rgb(90, 71, 132)',
  titleColor: 'rgb(250, 73, 56)',
  boxShadow: '#4F3B75',
  transition: 'all 0.2s ease'
};

export const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Bowlby+One+SC&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Bowlby One SC';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 16px;
  }
  html, body, #root  {
    background: ${theme.backgroundColor}
  }

  button {
    cursor: pointer;
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    
    appearance: none;
        &::-moz-focus-inner {
            border: 0;
            padding: 0;
        }
  }

`;
