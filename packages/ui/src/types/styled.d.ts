import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      text: string
      bg: string
      primaryBtnColor: stirng
      primaryBtnBg: stirng
      primaryBtnHover: string
      secondaryBtnColor: string
      secondaryBtnBg: string
      secondaryBtnHover: string
    }

    fonts: {
      base: string
    }

    fontSizes: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      xxl: string
      xxxl: string
    }

    letterSpacings: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      xxl: string
    }

    lineHeights: {
      xs: string
      sm: string
      base: string
      lg: string
      xl: string
      xxl: string
      xxxl: string
    }

    breakpoints: {
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
  }
}
