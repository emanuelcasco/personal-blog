import { style } from '@vanilla-extract/css'

import { tokens } from '@styles/theme'

const languagePicker = style({
  border: 'none',
  color: tokens.colors.neutral,
  fontWeight: 300,
  backgroundColor: 'transparent',
  appearance: 'none',
  ':hover': {
    cursor: 'pointer',
  },
})

const languagePicker__option = style({
  color: tokens.colors.neutral,
  fontWeight: 300,
})

export default {
  languagePicker,
  languagePicker__option,
}
