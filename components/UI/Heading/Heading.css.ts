import { style, styleVariants } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const base = style({
  color: tokens.colors.neutral,
  textDecoration: 'none',
  display: 'block',
  flex: 1,
})

const variants = styleVariants({
  h1: [
    base,
    {
      ...tokens.fonts['2xl'],
      marginBottom: tokens.space['xl'],
      letterSpacing: 1.4,
      fontWeight: 'bold',
    },
  ],
  h2: [
    base,
    {
      ...tokens.fonts['xl'],
      marginBottom: tokens.space.lg,
      letterSpacing: 1.2,
      fontWeight: 500,
    },
  ],
  h3: [
    base,
    {
      ...tokens.fonts['lg'],
      marginBottom: tokens.space.sm,
      letterSpacing: 1.2,
      fontWeight: 'bold',
    },
  ],
  h4: [
    base,
    {
      ...tokens.fonts['md'],
      marginBottom: tokens.space.sm,
      letterSpacing: 1.2,
      fontWeight: 'bold',
    },
  ],
  h5: [
    base,
    {
      ...tokens.fonts.sm,
      marginBottom: tokens.space.xs,
      letterSpacing: 1.2,
      fontWeight: 'bold',
    },
  ],
})

export default {
  variants,
}
