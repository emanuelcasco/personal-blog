import { createTheme } from '@vanilla-extract/css'

import themesContract from './themesContract.css'

export default createTheme(themesContract, {
  colors: {
    neutral: '#FAFAFA',
    background: '#1E1926',
    primary: '#0070f3',
    secondary: '#79FFE1',
    accent: '#EFA6FF',
    warning: '#FF0071',
    variants: {
      neutral: { light: '#FFFFFF', dark: '#CACACA' },
      background: { light: '#231d2c', dark: '#0F0F0F' },
      primary: { light: '#3590FC', dark: '#004FAE' },
      secondary: { light: '#AAFFEC', dark: '#20FCCB' },
      accent: { light: '#FAE1FF', dark: '#E878FF' },
      warning: { light: '#FE61A6', dark: '#E30063' },
    },
  },
})
