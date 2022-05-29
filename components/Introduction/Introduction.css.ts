import { style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const introduction__multimedia = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: tokens.space.lg,
})

const introduction__greeting = style({
  ...tokens.fonts.lg,
  color: tokens.colors.neutral,
})

const introduction__link = style({
  textDecoration: 'none',
  color: tokens.colors.primary,
  ':hover': {
    color: tokens.colors.secondary,
    textDecoration: 'underline',
  },
})

const introduction__presentation = style({
  display: 'flex',
  color: tokens.colors.neutral,
  flexDirection: 'column',
  justifyContent: 'center',
  gap: tokens.space.md,
})

export default {
  introduction__presentation,
  introduction__multimedia,
  introduction__greeting,
  introduction__link,
}
