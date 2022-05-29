import { style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const time = style({
  color: tokens.colors.variants.neutral.dark,
})

export default {
  time,
}
