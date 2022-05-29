import { tokens } from '@styles/theme'
import { style, keyframes } from '@vanilla-extract/css'

const common = {
  content: 'attr(title)',
  position: 'absolute',
  left: 0,
} as const

const glitchBase = keyframes({
  '2%, 80%': { transform: 'translate(1px,0) skew(2deg)' },
  '4%, 60%': { transform: 'translate(-1px,0) skew(-2deg)' },
  '62%': { transform: 'translate(0,0) skew(-5deg)' },
  '64%': { transform: 'translate(0,0) skew(5deg)' },
})

const glitchTop = keyframes({
  '2%, 64%': { transform: 'translate(1px,-1px)' },
  '4%, 60%': { transform: 'translate(-1px,1px)' },
  '62%': { transform: 'translate(8px, 10px) skew(15deg)' },
})

const glitchBotom = keyframes({
  '2%, 64%': { transform: 'translate(-1px,-2px)' },
  '4%, 60%': { transform: 'translate(-1px,0)' },
  '62%': { transform: 'translate(-16px,5px)' },
})

const glitch = style({
  isolation: 'isolate',
  animation: `${glitchBase} 1s linear infinite`,
  '::before': {
    ...common,
    color: tokens.colors.accent,
    animation: `${glitchTop} 3s linear infinite`,
    clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)',
    opacity: '0.7',
    zIndex: 1,
  },
  '::after': {
    ...common,
    color: tokens.colors.secondary,
    animation: `${glitchBotom} 2s linear infinite`,
    clipPath: 'polygon(0 67%, 100% 67%, 100% 100%, 0 100%)',
    opacity: '0.7',
    zIndex: 1,
  },
})

export default {
  glitch,
}
