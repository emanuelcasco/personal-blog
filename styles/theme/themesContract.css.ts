import { createThemeContract } from '@vanilla-extract/css'

export default createThemeContract({
  colors: {
    neutral: null,
    background: null,
    primary: null,
    secondary: null,
    accent: null,
    warning: null,
    variants: {
      neutral: { light: null, dark: null },
      background: { light: null, dark: null },
      primary: { light: null, dark: null },
      secondary: { light: null, dark: null },
      accent: { light: null, dark: null },
      warning: { light: null, dark: null },
    },
  },
})
