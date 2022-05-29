import { tokens } from '@styles/theme'
import { style } from '@vanilla-extract/css'

const avatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: `calc(-1 * ${tokens.space.xl})`,
  transition: 'transform .5s ease-in',
})

const avatar__stroke = style({
  fill: 'none',
  strokeWidth: tokens.space.sm,
  stroke: tokens.colors.primary,
  opacity: 0.5,
  transition: 'all .5s ease-in',
  selectors: {
    [`${avatar}:hover &`]: {
      opacity: 0.75,
    },
  },
})

export default {
  avatar,
  avatar__stroke,
}
