import { globalStyle, style } from '@vanilla-extract/css'

import { responsiveStyle, tokens } from '@styles/theme'

const flexContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  width: '100%',
  justifyContent: 'space-between',
  padding: 0,
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

globalStyle(`${flexContainer} > *`, {
  flexBasis: `calc(50% - ${tokens.space.sm})`,
})

const flexContainer__item = style({})

globalStyle(
  `${flexContainer__item}:only-child, ${flexContainer__item}:first-child:nth-last-child(3)`,
  {
    flexBasis: '100%',
  }
)

export default {
  flexContainer,
  flexContainer__item,
}
