import { createGlobalTheme } from '@vanilla-extract/css'

import * as TOKENS from './tokens'

export default createGlobalTheme('#app', {
  breakpoints: TOKENS.BREAKPOINTS,
  mediaQueries: TOKENS.MEDIA_QUERIES,
  fonts: {
    type: TOKENS.FONTS,
    size: TOKENS.FONT_SIZE_PROPERTIES,
    ...TOKENS.FONT_STYLES,
  },
  space: TOKENS.SPACE_PROPERTIES,
  size: TOKENS.SIZE_PROPERTIES,
})
