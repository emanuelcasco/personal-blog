import { style } from '@vanilla-extract/css'

import { responsiveStyle, tokens } from '@styles/theme'

export const container = style({
  position: 'fixed',
  top: '50%',
  left: tokens.space.lg,
  transform: 'translateY(-50%)',
  zIndex: 5,
  display: 'none',
  alignItems: 'stretch',
  pointerEvents: 'none',
  userSelect: 'none',
  ...responsiveStyle(
    {
      'for-tablet-portrait-up': {
        display: 'flex',
      },
      'for-tablet-landscape-up': {
        left: tokens.space['2xl'],
      },
      'for-desktop-up': {
        left: tokens.space['3xl'],
      },
    },
    {
      display: 'none',
    }
  ),
})

export const track = style({
  position: 'relative',
  width: '6px',
  height: '20vh',
  minHeight: '60px',
  borderRadius: tokens.space['2xs'],
  background: 'rgba(0, 0, 0, 0.16)',
  overflow: 'hidden',
  pointerEvents: 'auto',
  cursor: 'pointer',
})

export const fill = style({
  position: 'absolute',
  inset: 0,
  transformOrigin: 'top center',
  background: tokens.colors.neutral,
  borderRadius: 'inherit',
  transition: 'transform 120ms ease-out',
})

export const thumb = style({
  position: 'absolute',
  left: '50%',
  width: '1rem',
  height: '1rem',
  transform: 'translate(-50%, -50%)',
  borderRadius: '100%',
  background: tokens.colors.neutral,
  border: '1px solidhsl(0, 0.00%, 26.30%)',
  boxShadow: '0 3px 8px rgba(0, 0, 0, 0.2)',
  transition: 'top 120ms ease-out',
  pointerEvents: 'none',
})
