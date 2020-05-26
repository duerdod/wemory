import { createGlobalStyle } from 'styled-components'

const deviceWidths = {
  smallDown: 'max-width: 40em',
  largeUp: 'min-width: 40em',
}

type ValidSize = 'smallDown' | 'largeUp'

interface IDeviceWidths {
  [key: string]: (css: string | TemplateStringsArray) => string
}

// Rewwrite to expect the css helper (eg. a fn?).
// I think it's needed to get syntax highlight...
export const deviceWidth = Object.keys(deviceWidths).reduce(
  (widths, currentWidth) => {
    // Object property returns a function which wraps the params in a media query.
    widths[currentWidth as ValidSize] = (css) => `
    @media (${deviceWidths[currentWidth as ValidSize]}) {
      ${css}
    }
  `
    return widths
  },
  {} as IDeviceWidths
)

// Call it either with or without ()
// ie deviceWidth.smallDown(``) or deviceWidth.smallDown``

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
}

export const GlobalStyle = createGlobalStyle`

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

  body {
    &.scroll-lock {
      overflow: hidden;
      position: fixed;
      width: 100%;
    }
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

`
