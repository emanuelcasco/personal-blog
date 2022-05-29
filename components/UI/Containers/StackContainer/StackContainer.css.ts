import { style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const stack = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: tokens.space['xl'],
  height: '100%',
  width: '100%',
})

export default {
  stack,
}
