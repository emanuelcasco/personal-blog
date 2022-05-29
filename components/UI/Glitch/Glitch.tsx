import { composeStyles } from '@styles/theme'
import styles from './Glitch.css'

interface GlitchProps {
  children: string
  className?: string
}

function Glitch({ children, className }: GlitchProps) {
  return (
    <span
      key={`glitch-effect-${children}`}
      className={composeStyles([styles.glitch, className])}
      title={children}
      style={{ marginRight: '8px' }}
    >
      {children}
    </span>
  )
}

export default Glitch
