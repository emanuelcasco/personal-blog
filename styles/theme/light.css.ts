import { createTheme } from '@vanilla-extract/css'

import themesContract from './themesContract.css'

export default createTheme(themesContract, {
  colors: {
    neutral: '#1E1926',
    background: '#FAFAFA',
    primary: '#0070f3',
    accent: '#79FFE1',
    secondary: '#EFA6FF',
    warning: '#FF0071',
    variants: {
      neutral: { light: '#CACACA', dark: '#0F091A' },
      background: { light: '#FFFFFF', dark: '#CACACA' },
      primary: { light: '#3590FC', dark: '#004FAE' },
      secondary: { light: '#FAE1FF', dark: '#E878FF' },
      accent: { light: '#AAFFEC', dark: '#20FCCB' },
      warning: { light: '#FE61A6', dark: '#E30063' },
    },
  },
})
