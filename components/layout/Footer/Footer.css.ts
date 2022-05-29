import { style } from '@vanilla-extract/css'

import { tokens, responsiveStyle } from '@styles/theme'

const footer = style({
  ...tokens.fonts.sm,
  display: 'flex',
  paddingBlock: tokens.space.md,
  color: tokens.colors.neutral,
  backgroundColor: 'inherit',
  marginTop: tokens.space.xl,
  width: '100%',
  ...responsiveStyle({
    'for-tablet-portrait-up': {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingInline: tokens.space.md,
    },
    'for-desktop-up': {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingInline: tokens.space.lg,
    },
  }),
})

export default {
  footer,
}
