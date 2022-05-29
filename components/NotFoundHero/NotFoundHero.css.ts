import { style } from '@vanilla-extract/css'

import { responsiveStyle, tokens } from '@styles/theme'

const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '55vw',
  alignSelf: 'center',
  gap: tokens.space.md,
})

const image = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...responsiveStyle({
    'for-mobile': { display: 'none' },
    'for-tablet-portrait-up': { display: 'flex' },
  }),
})

const content = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: tokens.space.md,
})

const title = style({
  ...tokens.fonts['5xl'],
  position: 'relative',
  margin: 0,
})

export default {
  container,
  content,
  image,
  title,
}
