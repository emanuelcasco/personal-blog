import { globalStyle, style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const postBody = style({
  fontSize: '16px',
  lineHeight: '1.4',
  color: tokens.colors.neutral,
  fontFamily: tokens.fonts.type.body,
  letterSpacing: '-0.003em',
  width: '100%',
})

const headingAnchor = style({
  position: 'absolute',
  left: '-1.5rem',
  color: 'rgba(0, 0, 0, 0.3)',
  textDecoration: 'none',
  fontSize: '0.85em',
  fontWeight: 400,
  opacity: 0,
  transition: 'opacity 0.2s ease, color 0.2s ease',
  cursor: 'pointer',
  ':hover': {
    color: tokens.colors.primary,
    textDecoration: 'none',
  },
})

// Typography - Medium style headings
globalStyle(`${postBody} h1`, {
  fontSize: '2.5rem',
  lineHeight: '1.4',
  fontWeight: 700,
  fontFamily: tokens.fonts.type.heading,
  marginTop: '2rem',
  marginBottom: '1.2rem',
  letterSpacing: '-0.022em',
})

globalStyle(`${postBody} h2`, {
  fontSize: '2rem',
  lineHeight: '1.4',
  fontWeight: 600,
  fontFamily: tokens.fonts.type.heading,
  marginTop: '1.2rem',
  marginBottom: '1.2rem',
  letterSpacing: '-0.018em',
  position: 'relative',
})

globalStyle(`${postBody} h2:hover .${headingAnchor}`, {
  opacity: 1,
})

globalStyle(`${postBody} h3`, {
  fontSize: '1.5rem',
  lineHeight: '1.4',
  fontWeight: 600,
  fontFamily: tokens.fonts.type.heading,
  marginTop: '1.2rem',
  marginBottom: '1.2rem',
  letterSpacing: '-0.014em',
  position: 'relative',
})

globalStyle(`${postBody} h3:hover .${headingAnchor}`, {
  opacity: 1,
})

globalStyle(`${postBody} h4`, {
  fontSize: '1.25rem',
  lineHeight: '1.4',
  fontWeight: 600,
  fontFamily: tokens.fonts.type.heading,
  marginTop: '1.2rem',
  marginBottom: '1.2rem',
  letterSpacing: '-0.003em',
})

// Paragraphs - Medium's signature spacing
globalStyle(`${postBody} p`, {
  marginBottom: '1.1rem',
  fontSize: '1rem',
  lineHeight: '1.4',
  letterSpacing: '-0.003em',
  textAlign: 'left',
  overflowWrap: 'break-word',
})

// Lists - Clean Medium-style lists
globalStyle(`${postBody} ul, ${postBody} ol`, {
  marginBottom: '12px',
  marginTop: '12px',
  paddingLeft: '32px',
})

globalStyle(`${postBody} ul`, {
  listStyleType: 'disc',
})

globalStyle(`${postBody} ol`, {
  listStyleType: 'decimal',
})

globalStyle(`${postBody} li`, {
  fontSize: '1rem',
  lineHeight: '1.4',
  marginBottom: '8px',
  letterSpacing: '-0.003em',
  paddingLeft: '4px',
})

globalStyle(`${postBody} li::marker`, {
  color: tokens.colors.primary,
  fontWeight: 500,
})

// Nested lists
globalStyle(
  `${postBody} ul ul, ${postBody} ol ol, ${postBody} ul ol, ${postBody} ol ul`,
  {
    marginTop: '8px',
    marginBottom: '8px',
    paddingLeft: '24px',
  }
)

// Code styling - Medium-inspired
globalStyle(`${postBody} code`, {
  borderRadius: '3px',
  fontSize: '.8rem',
  padding: '2px 6px',
  fontFamily: tokens.fonts.type.monospace,
  fontWeight: 500,
  letterSpacing: '0',
})

globalStyle(`${postBody} pre`, {
  borderRadius: '6px',
  padding: '24px',
  marginTop: '32px',
  marginBottom: '32px',
  overflow: 'auto',
  border: '1px solid #e6e6e6',
})

globalStyle(`${postBody} pre code`, {
  padding: '0',
  fontSize: '16px',
  lineHeight: '1.45',
  fontWeight: 400,
  whiteSpace: 'pre',
  overflow: 'visible',
})

// Links - Medium style
globalStyle(`${postBody} a`, {
  color: 'inherit',
  textDecoration: 'underline',
  textDecorationColor: 'rgba(0, 0, 0, 0.68)',
  textDecorationThickness: '1px',
  textUnderlineOffset: '2px',
  transition: 'text-decoration-color 0.2s ease',
})

globalStyle(`${postBody} a:hover`, {
  textDecorationColor: tokens.colors.primary,
})

// Blockquotes - Medium style
globalStyle(`${postBody} blockquote`, {
  marginLeft: '0',
  marginRight: '0',
  marginTop: '32px',
  marginBottom: '32px',
  paddingLeft: '23px',
  borderLeft: '3px solid rgba(0, 0, 0, 0.84)',
  fontStyle: 'italic',
  fontSize: '21px',
  lineHeight: '1.58',
  letterSpacing: '-0.003em',
})

// Images - Medium style with captions
globalStyle(`${postBody} img`, {
  maxWidth: 'min(100%, 700px)',
  height: 'auto',
  display: 'block',
  margin: '32px auto',
  borderRadius: '6px',
})

globalStyle(`${postBody} img + em`, {
  display: 'block',
  textAlign: 'center',
  fontSize: '16px',
  lineHeight: '1.4',
  color: 'rgba(0, 0, 0, 0.68)',
  fontStyle: 'italic',
  marginTop: '-24px',
  marginBottom: '32px',
})

// Tables - Clean Medium style
globalStyle(`${postBody} table`, {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '32px',
  marginBottom: '32px',
  fontSize: '18px',
  lineHeight: '1.5',
})

globalStyle(`${postBody} th, ${postBody} td`, {
  padding: '12px 16px',
  borderBottom: '1px solid #e6e6e6',
  textAlign: 'left',
})

globalStyle(`${postBody} th`, {
  fontWeight: 600,
  backgroundColor: 'inherit',
})

// Horizontal rules
globalStyle(`${postBody} hr`, {
  border: 'none',
  height: '1px',
  backgroundColor: '#e6e6e6',
  margin: '48px 0',
})

// Strong and emphasis
globalStyle(`${postBody} strong`, {
  fontWeight: 700,
})

globalStyle(`${postBody} em`, {
  fontStyle: 'italic',
})

export default {
  postBody,
  headingAnchor,
}
