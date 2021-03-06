import { style } from '@vanilla-extract/css'

const fancyDivider = style({
  margin: '1.5em auto',
  position: 'relative',
  height: '9px',
  width: '9px',
  border: 'transparent',
  overflow: 'visible',
  backgroundImage: `url('data:image/svg+xml;utf8,<svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><rect x="0.75" y="0.5" width="8" height="8" rx="4" fill="%230070f3" /></svg>')`,
  '::before': {
    position: 'absolute',
    height: '9px',
    width: '10px',
    content: '',
    backgroundImage: `url('data:image/svg+xml;utf8,<svg width="10" height="9" viewBox="0 0 10 9" xmlns="http://www.w3.org/2000/svg"><path d="M3.91043 1.29752C4.30449 0.688518 5.19551 0.688519 5.58957 1.29752L9.25143 6.95675C9.68196 7.62211 9.20436 8.5 8.41186 8.5H1.08814C0.29564 8.5 -0.181954 7.62211 0.248574 6.95675L3.91043 1.29752Z" fill="%230070f3" /></svg>')`,
    left: '-18px',
  },
  '::after': {
    position: 'absolute',
    height: '9px',
    width: '9px',
    content: '',
    backgroundImage: `url('data:image/svg+xml;utf8,<svg width="9" height="9" viewBox="0 0 9 9" xmlns="http://www.w3.org/2000/svg"><rect x="0.75" y="0.5" width="8" height="8" rx="1" fill="%230070f3" /></svg>')`,
    right: '-18px',
  },
})

export default {
  fancyDivider,
}
