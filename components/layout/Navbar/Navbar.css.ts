import { style } from '@vanilla-extract/css'

import { tokens, responsiveStyle } from '@styles/theme'

const navbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: tokens.space.md,
  ...responsiveStyle({
    'for-mobile': {
      justifyContent: 'center',
    },
    'for-tablet-landscape-up': {
      justifyContent: 'flex-end',
    },
  }),
})

const navbar__link = style({
  textDecoration: 'none',
  color: tokens.colors.neutral,
  fontWeight: 300,
  ':hover': {
    textDecoration: 'underline',
    fontWeight: 500,
  },
})

const navbar__linkActive = style({
  color: tokens.colors.primary,
  fontWeight: 500,
  textDecoration: 'underline',
  ':hover': {
    color: tokens.colors.variants.primary.light,
  },
})

export default {
  navbar,
  navbar__link,
  navbar__linkActive,
}
