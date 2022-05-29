import { style } from '@vanilla-extract/css'

import { tokens, responsiveStyle } from '@styles/theme'

const layout = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  transition: 'background-color 1s',
  backgroundColor: tokens.colors.background,
  height: 'fit-content',
  minHeight: '100%',
})

const main = style({
  alignSelf: 'center',
  justifySelf: 'stretch',
  width: '100%',
  maxWidth: '750px',
  paddingBlock: tokens.space.sm,
  ...responsiveStyle({
    'for-mobile': {
      paddingInline: tokens.space.md,
    },
    'for-tablet-portrait-up': {
      paddingInline: tokens.space.lg,
    },
    'for-tablet-landscape-up': {
      paddingInline: '0px',
    },
  }),
})

export default {
  main,
  layout,
}
