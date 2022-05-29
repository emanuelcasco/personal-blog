import { ReactNode, CSSProperties } from 'react'

import styles from './Heading.css'
import { composeStyles } from '@styles/theme'

interface HeadingProps {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  children: ReactNode
  className?: string
  style?: CSSProperties
}

function Heading({ type: Tag, children, className, style }: HeadingProps) {
  return (
    <Tag
      className={
        className
          ? composeStyles([styles.variants[Tag], className])
          : styles.variants[Tag]
      }
      style={style}
    >
      {children}
    </Tag>
  )
}

export default Heading
