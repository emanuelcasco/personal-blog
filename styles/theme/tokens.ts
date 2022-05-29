// import type { ComplexStyleRule } from '@vanilla-extract/css'

export type MediaQueries = Record<
  keyof typeof BREAKPOINTS,
  Record<string, string>
>
export type Breakpoints = keyof typeof BREAKPOINTS
export type CustomStyles = Record<string, string>

export const ANIMATION = {
  default: '400ms ease-in',
  fast: '300ms ease-in',
}

export const BREAKPOINTS = {
  'for-mobile': 'screen',
  'for-tablet-portrait-up': 'screen and (min-width: 480px)',
  'for-tablet-landscape-up': 'screen and (min-width: 900px)',
  'for-desktop-up': 'screen and (min-width: 1200px)',
  'for-big-desktop-up': 'screen and (min-width: 1800px)',
}

// Generates media queries formatted for Vanilla Extract
export const MEDIA_QUERIES = Object.entries(BREAKPOINTS).reduce(
  (mergeObj, [key, value]) => ({
    ...mergeObj,
    [key]: {
      '@media': value,
    },
  }),
  {} as MediaQueries
)

export const FONTS = {
  body: 'Roboto, Helvetiva Neue, Helvetica, Aria, sans-serif',
  heading: 'Archivo, Helvetiva Neue, Helvetica, Aria, sans-serif',
  monospace: 'Menlo, monospace',
}

export const FONT_SIZE_PROPERTIES = {
  xs: '12px',
  sm: '14px',
  md: '18px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '56px',
  '4xl': '64px',
  '5xl': '94px',
}

export const FONT_STYLES = Object.entries(FONT_SIZE_PROPERTIES).reduce(
  (styles, [key, value]) => ({
    ...styles,
    [key]: {
      fontSize: value,
      lineHeight: `calc(${value} + 8px)`,
    },
  }),
  {} as Record<keyof typeof FONT_SIZE_PROPERTIES, CustomStyles>
)

export const SPACE_PROPERTIES = {
  '2xs': '2px',
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
}

export const SIZE_PROPERTIES = Object.entries(SPACE_PROPERTIES).reduce(
  (styles, [key, value]) => ({
    ...styles,
    [key]: {
      height: value,
      width: value,
    },
  }),
  {} as Record<keyof typeof SPACE_PROPERTIES, CustomStyles>
)
