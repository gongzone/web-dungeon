import { normalize } from 'polished'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  html {
    font-size: 16px;
    box-sizing: border-box;
  }

  *, *::before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.bg};
    font-family: ${({ theme }) => theme.fonts.base};
    letter-spacing: ${({ theme }) => theme.letterSpacings.base};
    line-height: ${({ theme }) => theme.lineHeights.lg};
  }

  main {
    width: 90%;
    margin: 0 auto;
  }

`
