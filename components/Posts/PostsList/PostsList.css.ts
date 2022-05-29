import { globalStyle, style } from '@vanilla-extract/css'

import { tokens, responsiveStyle } from '@styles/theme'

const postUl = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  listStyle: 'none',
  padding: 0,
  margin: `calc(-1 * ${tokens.space.md})`,
  gap: tokens.space.md,
  ...responsiveStyle({
    'for-mobile': {
      flexDirection: 'column',
    },
    'for-tablet-landscape-up': {
      flexDirection: 'row',
    },
  }),
})

globalStyle(`${postUl} > *`, {
  flexBasis: `calc(50% - ${tokens.space.sm})`,
})

export default {
  postUl,
}
