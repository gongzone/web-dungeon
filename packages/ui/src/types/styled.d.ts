import 'styled-components'
import {
  type ColorsType,
  type FontesType,
  type FontSizesType,
  type LetterSpacingsType,
  type LineHeightsType,
  type BreakpointsType,
} from '../foundation'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorsType
    fonts: FontesType
    fontSizes: FontSizesType
    letterSpacings: LetterSpacingsType
    lineHeights: LineHeightsType
    breakpoints: BreakpointsType
  }
}
