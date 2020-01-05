import { createGlobalStyle } from 'styled-components';

export const theme = {
  fontFamily: 'Passion One, Baloo Bhai, sans-serif',
  secondFont: 'Baloo Bhai, sans-serif',
  fontWeight: ['400', '900'],
  backgroundColor: 'hsl(156, 48%, 76%)',
  cardColor: 'hsl(156, 48%, 68%)',
  boxShadow: 'hsl(156, 48%, 48%)',
  titleColor: 'hsl(335, 85%, 65%)',
  titleTextShadow: 'hsl(335, 85%, 55%)',
  secondaryColor: 'hsl(49.8, 100%, 64.1%)',
  transition: '150ms cubic-bezier(0, 0, 0.58, 1)',
};

export const GlobalStyle = createGlobalStyle`

/* @import url('https://fonts.googleapis.com/css?family=Bowlby+One+SC&display=swap'); */
/* @import url('https://fonts.googleapis.com/css?family=&display=swap'); */
@import url('https://fonts.googleapis.com/css?family=Passion+One:400,900|Baloo+Bhai&display=swap');

@keyframes anim {
	from { background-position: 0 0px; }
	to { background-position: 100% 0px; }
}

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: ${theme.fontFamily};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 16px;
    overflow-x: hidden;
  }

  html, body, #root  {
    background: ${theme.backgroundColor};
  }
  
  #root {
    min-height: 100vh;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAI0lEQVQYlWNgIAe0Xd36H4bxKsLHxy2ILo7XGiLkyVdMNAAA/OEelx+AVZ8AAAAASUVORK5CYII=) repeat;
    background-position: 0px 0px;
	  background-repeat: repeat;
    animation: anim 60s linear infinite;
    will-change: background;
    
    &.scroll-lock {
      overflow: hidden;
      position: fixed;
      width: 100%;
    }

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
