import { style, styleVariants } from '@vanilla-extract/css'

const imageBase = style({
  width: '100%',
  objectPosition: 'center',
  objectFit: 'cover',
  verticalAlign: 'middle',
})

const container = style({
  width: '100vw',
  alignSelf: 'center',
})

const image = styleVariants({
  small: [imageBase, { height: '12rem' }],
  large: [imageBase, { height: '24rem' }],
})

export default {
  container,
  image,
}
