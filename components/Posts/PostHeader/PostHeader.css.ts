import { style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: tokens.space.xl,
  width: '100%',
})

const row = style({
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-between',
  width: '100%',
})

export default {
  container,
  row,
}
