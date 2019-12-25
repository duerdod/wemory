import { createGlobalStyle } from 'styled-components';

export const theme = {
  fontStyle: 'Roboto, sans-serif',
  fontWeight: ['400', '900']
};

export const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Roboto:400,900&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 16px;
  }
  html, body, #root {
    min-height: 100%;
    background: cornflowerblue;
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
