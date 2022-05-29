import { composeStyles } from '@styles/theme'
import React from 'react'
import { ReactNode, useMemo } from 'react'

import styles from './FlexContainer.css'

interface FlexContainerProps {
  children: ReactNode
  tag?: 'div' | 'section' | 'ul' | 'article'
  className?: string
}

function FlexContainer({
  children,
  className,
  tag: Tag = 'div',
}: FlexContainerProps) {
  const updatedChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const currentClassName = (child as any).props.className
      return ['string', 'number', 'boolean'].includes(typeof child)
        ? child
        : React.cloneElement(child as React.ReactElement, {
            className: currentClassName
              ? `${styles.flexContainer__item} ${currentClassName}`
              : styles.flexContainer__item,
          })
    })
  }, [children])
  return (
    <Tag
      className={
        className
          ? composeStyles([styles.flexContainer, className])
          : styles.flexContainer
      }
    >
      {updatedChildren}
    </Tag>
  )
}

export default FlexContainer
