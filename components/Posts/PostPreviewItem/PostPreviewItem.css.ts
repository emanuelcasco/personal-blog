import { globalStyle, style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const postPreview = style({
  display: 'flex',
  flexDirection: 'column',
  minHeight: tokens.space.sm,
  gap: tokens.space['xs'],
  borderRadius: tokens.space['xs'],
  overflow: 'hidden',
  backgroundColor: tokens.colors.background,
  transition: 'background-color .5s ease-in',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: tokens.colors.variants.background.light,
  },
})

const postPreview__content = style({
  display: 'flex',
  flexDirection: 'column',
})

const postPreview__date = style({
  ...tokens.fonts.xs,
  color: tokens.colors.variants.neutral.dark,
  fontWeight: 300,
})

const postPreview__excerpt = style({
  ...tokens.fonts.sm,
  color: tokens.colors.neutral,
})

globalStyle(
  `${postPreview}:only-child, ${postPreview}:first-child:nth-last-child(3)`,
  {
    flexBasis: '100%',
  }
)

export default {
  postPreview,
  postPreview__content,
  postPreview__date,
  postPreview__excerpt,
}
