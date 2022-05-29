import { style } from '@vanilla-extract/css'

import { tokens, responsiveStyle } from '@styles/theme'

const header = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'inherit',
  gap: tokens.space.sm,
  width: '100%',
  ...responsiveStyle({
    'for-mobile': {
      paddingInline: tokens.space.sm,
      paddingBlock: tokens.space.sm,
    },
    'for-tablet-portrait-up': {
      paddingInline: tokens.space.lg,
      paddingBlock: tokens.space.lg,
    },
  }),
})

const brand = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: tokens.space.md,
  height: '100%',
  ':hover': {
    cursor: 'pointer',
  },
})

const brand__image = style({
  height: tokens.space['xl'],
  width: tokens.space['xl'],
  transition: 'transform .5s ease-in',
  selectors: {
    [`${brand}:hover &`]: {
      transform: 'rotate(20deg)',
    },
  },
})

const brand__text = style({
  ...tokens.fonts.md,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: tokens.space.sm,
  color: tokens.colors.neutral,
})

const brand__textName = style({
  selectors: {
    [`${brand}:hover &`]: {
      color: tokens.colors.primary,
    },
  },
})

const brand__textRole = style({
  fontWeight: 300,
  '::before': {
    content: '/ ',
    whiteSpace: 'pre',
  },
  ...responsiveStyle({
    'for-mobile': {
      display: 'none',
    },
    'for-tablet-portrait-up': {
      display: 'flex',
    },
  }),
})

const navbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: tokens.space.md,
  ...responsiveStyle({
    'for-mobile': {
      display: 'none',
    },
    'for-tablet-landscape-up': {
      display: 'flex',
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
  header,
  brand,
  brand__image,
  brand__text,
  brand__textName,
  brand__textRole,
  navbar,
  navbar__link,
  navbar__linkActive,
}
