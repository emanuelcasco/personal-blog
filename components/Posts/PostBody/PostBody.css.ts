import { globalStyle, style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const postBody = style({
  fontSize: '21px',
  lineHeight: '1rem',
  color: tokens.colors.neutral,
  fontFamily: tokens.fonts.type.body,
  letterSpacing: '-0.003em',
})

// Typography - Medium style headings
globalStyle(`${postBody} h1`, {
  fontSize: '40px',
  lineHeight: '1rem',
  fontWeight: 700,
  fontFamily: tokens.fonts.type.heading,
  marginTop: '48px',
  marginBottom: '16px',
  letterSpacing: '-0.022em',
})

globalStyle(`${postBody} h2`, {
  fontSize: '32px',
  lineHeight: '1.2',
  fontWeight: 600,
  fontFamily: tokens.fonts.type.heading,
  marginTop: '40px',
  marginBottom: '16px',
  letterSpacing: '-0.018em',
})

globalStyle(`${postBody} h3`, {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: 600,
  fontFamily: tokens.fonts.type.heading,
  marginTop: '32px',
  marginBottom: '12px',
  letterSpacing: '-0.014em',
})

globalStyle(`${postBody} h4`, {
  fontSize: '21px',
  lineHeight: '1.4',
  fontWeight: 600,
  fontFamily: tokens.fonts.type.heading,
  marginTop: '28px',
  marginBottom: '8px',
  letterSpacing: '-0.003em',
})

// Paragraphs - Medium's signature spacing
globalStyle(`${postBody} p`, {
  marginBottom: '24px',
  fontSize: '21px',
  lineHeight: '1.58',
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
  fontSize: '21px',
  lineHeight: '1.58',
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
  backgroundColor: 'rgba(135, 131, 120, 0.15)',
  color: '#eb5757',
  borderRadius: '3px',
  fontSize: '18px',
  padding: '2px 6px',
  fontFamily: tokens.fonts.type.monospace,
  fontWeight: 500,
  letterSpacing: '0',
})

globalStyle(`${postBody} pre`, {
  backgroundColor: '#f7f6f3',
  borderRadius: '6px',
  padding: '24px',
  marginTop: '32px',
  marginBottom: '32px',
  overflow: 'auto',
  border: '1px solid #e6e6e6',
})

globalStyle(`${postBody} pre code`, {
  backgroundColor: 'transparent',
  color: '#24292e',
  padding: '0',
  fontSize: '16px',
  lineHeight: '1.45',
  fontWeight: 400,
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
  maxWidth: 'max(100%, 500px)',
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

// Special formatting for emoji lists (like your LoRaWAN post)
globalStyle(`${postBody} pre:has(code)`, {
  backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  borderLeft: '4px solid #f59e0b',
})

// Dark mode adjustments
globalStyle(`${postBody}[data-theme="dark"] code`, {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#ff6b6b',
})

globalStyle(`${postBody}[data-theme="dark"] pre`, {
  backgroundColor: '#2d3748',
  borderColor: '#4a5568',
})

globalStyle(`${postBody}[data-theme="dark"] pre code`, {
  color: '#e2e8f0',
})

globalStyle(`${postBody}[data-theme="dark"] blockquote`, {
  borderLeftColor: 'rgba(255, 255, 255, 0.68)',
})

export default {
  postBody,
}
