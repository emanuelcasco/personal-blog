import { style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const social = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: 'inherit',
  maxWidth: '150px',
  gap: tokens.space.md,
})

const social__link = style({
  fill: tokens.colors.neutral,
  transition: 'transform .5s ease-in',
  ':hover': {
    cursor: 'pointer',
    fill: tokens.colors.secondary,
    transform: 'rotate(20deg)',
  },
})

export default {
  social,
  social__link,
}
