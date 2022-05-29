import { globalStyle, style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const postBody = style({
  fontSize: '1.25rem',
  lineHeight: '1.5',
  color: tokens.colors.neutral,
})

globalStyle(`${postBody} > ul, ol, li`, {
  paddingInline: tokens.space['md'],
  paddingBlock: tokens.space['sm'],
})

globalStyle(`${postBody} > ol li::marker`, {
  ...tokens.fonts.lg,
  color: tokens.colors.primary,
})

globalStyle(`${postBody} > ul li::marker`, {
  ...tokens.fonts.lg,
  content: '⬢',
  marginBottom: tokens.space['md'],
  color: tokens.colors.primary,
})

globalStyle(`${postBody} > p, ul, ol, blockquote, pre, h1, h2, h3, h4`, {
  marginBlock: tokens.space['lg'],
  textAlign: 'justify',
  overflowWrap: 'anywhere',
})

globalStyle(`${postBody} p > code`, {
  color: tokens.colors.primary,
  backgroundColor: tokens.colors.variants.background.dark,
  borderRadius: tokens.space['2xs'],
  paddingBlock: tokens.space['2xs'],
  paddingInline: tokens.space['xs'],
})

globalStyle(`${postBody} pre`, {
  padding: tokens.space['lg'],
  marginInline: `calc(-1 * ${tokens.space['lg']})`,
  border: 'none',
  ...tokens.fonts.md,
})

globalStyle(`${postBody} a`, {
  color: tokens.colors.neutral,
  fontWeight: 500,
  textDecoration: 'underline',
})

globalStyle(`${postBody} a:hover`, {
  color: tokens.colors.secondary,
  fontWeight: 700,
  textDecoration: 'underline',
})

globalStyle(`${postBody} p > img`, {
  borderRadius: tokens.space['sm'],
  marginInline: 'auto',
})

export default {
  postBody,
}
