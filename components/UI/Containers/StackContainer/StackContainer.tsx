import { ReactNode } from 'react'

import { composeStyles } from '@styles/theme'

import styles from './StackContainer.css'

interface StackContainerProps {
  children: ReactNode
  tag?: 'div' | 'section' | 'ul' | 'article'
  className?: string
}

function StackContainer({
  children,
  className,
  tag: Tag = 'div',
}: StackContainerProps) {
  return (
    <Tag
      className={
        className ? composeStyles([styles.stack, className]) : styles.stack
      }
    >
      {children}
    </Tag>
  )
}

export default StackContainer
