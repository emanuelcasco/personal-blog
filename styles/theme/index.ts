import baseTokens from './base.css'
import darkTheme from './dark.css'
import lightTheme from './light.css'
import themesContract from './themesContract.css'

export * from './utils'

export const themes = {
  light: lightTheme,
  dark: darkTheme,
}

export const tokens = {
  ...baseTokens,
  ...themesContract,
}
