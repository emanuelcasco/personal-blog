import { style } from '@vanilla-extract/css'

import { responsiveStyle, tokens } from '@styles/theme'

const backButton = style({
  display: 'flex',
  justifyContent: 'space-between',
  background: 'inherit',
  border: 'none',
  padding: 0,
  gap: tokens.space.md,
  color: tokens.colors.neutral,
  letterSpacing: 1.2,
  fontWeight: 500,
  ':hover': {
    cursor: 'pointer',
    fontWeight: 700,
  },
  ...responsiveStyle({
    'for-mobile': {
      flexDirection: 'column',
    },
    'for-tablet-landscape-up': {
      flexDirection: 'row',
    },
  }),
})

export default {
  backButton,
}
