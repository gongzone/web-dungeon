const sizes = [
  '0.75 ' /* 12px */,
  '1rem' /* 16px */,
  '1.25rem' /* 20px */,
  '1.5rem' /* 24px */,
  '1.75rem' /* 28px */,
  '2rem' /* 32px */,
  '2.25rem' /* 36px */,
]

export const lineHeights = {
  xs: sizes[0],
  sm: sizes[1],
  base: sizes[2],
  lg: sizes[3],
  xl: sizes[4],
  xxl: sizes[5],
  xxxl: sizes[6],
}

export type LineHeightsType = typeof lineHeights
