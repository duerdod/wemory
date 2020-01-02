import { createGlobalStyle } from 'styled-components';

export const theme = {
  fontFamily: 'Bowlby One SC, sans-serif',
  fontWeight: ['400', '900'],
  backgroundColor: 'hsl(156, 48%, 76%)',
  cardColor: 'hsl(156, 48%, 68%)',
  boxShadow: 'hsl(156, 48%, 48%)',
  titleColor: 'hsl(335, 85%, 65%)',
  titleTextShadow: 'hsl(335, 85%, 55%)',
  secondaryColor: 'hsl(49.8, 100%, 64.1%)',
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
    background: ${theme.backgroundColor};
  }

  #root {
    min-height: 100vh;
    background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAKklEQVQYlWNgQAMTzm75jy6GAWCK8CpGl8SqGJcJKOKE3ESUm8lSTDQAAILMHqF/VghBAAAAAElFTkSuQmCC) repeat;
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
