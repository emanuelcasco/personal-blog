import { keyframes, style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const themePicker = style({
  border: 'none',
  color: tokens.colors.neutral,
  fontWeight: 300,
  backgroundColor: 'transparent',
  transition: 'transform .5s lineal;',
  ':hover': {
    cursor: 'pointer',
  },
  ':active': {
    cursor: 'pointer',
  },
})

const rotate = keyframes({
  '25%': { transform: 'rotate(45deg)' },
  '50%': { transform: 'rotate(90deg)' },
  '75%': { transform: 'rotate(180deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

export default {
  themePicker,
  rotate,
}
