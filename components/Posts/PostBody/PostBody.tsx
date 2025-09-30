'use client'

import { useCallback, useMemo } from 'react'
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from 'react'

import { Post } from '@entities'

import styles from './PostBody.css'

type PostBodyProps = {
  content: Post['content']
}

const PostBody = ({ content }: PostBodyProps) => {
  const enhancedContent = useMemo(() => {
    const html = content?.toString() ?? ''

    if (typeof window === 'undefined') {
      return html
    }

    const template = window.document.createElement('template')
    template.innerHTML = html

    const headings =
      template.content.querySelectorAll<HTMLElement>('h2[id], h3[id]')

    headings.forEach((heading) => {
      const id = heading.getAttribute('id')
      const existingAnchor = heading.querySelector(`.${styles.headingAnchor}`)

      if (!id || existingAnchor) {
        return
      }

      const anchor = window.document.createElement('a')
      anchor.href = `#${id}`
      anchor.className = styles.headingAnchor
      anchor.textContent = '#'
      anchor.setAttribute('aria-label', 'Copy link to section')
      heading.prepend(anchor)
    })

    return template.innerHTML
  }, [content])

  const copyHeadingLink = useCallback((target: HTMLElement) => {
    const heading = target.parentElement
    const id = heading?.getAttribute('id')

    if (!id) {
      return
    }

    const url = `${window.location.origin}${window.location.pathname}#${id}`
    const { clipboard } = navigator

    if (!clipboard || !clipboard.writeText) {
      window.location.hash = id
      return
    }

    const originalText = target.textContent

    clipboard
      .writeText(url)
      .then(() => {
        target.textContent = '✓'

        const resetTimeoutId = target.dataset.resetTimeoutId

        if (resetTimeoutId) {
          window.clearTimeout(Number(resetTimeoutId))
        }

        const timeoutId = window.setTimeout(() => {
          target.textContent = originalText ?? '#'
          target.dataset.resetTimeoutId = ''
        }, 1000)

        target.dataset.resetTimeoutId = timeoutId.toString()
      })
      .catch(() => {
        window.location.hash = id
      })
  }, [])

  const handleHeadingClick = useCallback(
    (event: ReactMouseEvent<HTMLElement>) => {
      const target = event.target as HTMLElement

      if (!target.classList.contains(styles.headingAnchor)) {
        return
      }

      event.preventDefault()
      copyHeadingLink(target)
    },
    [copyHeadingLink]
  )

  const handleHeadingKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      const target = event.target as HTMLElement

      if (!target.classList.contains(styles.headingAnchor)) {
        return
      }

      if (event.key !== 'Enter' && event.key !== ' ') {
        return
      }

      event.preventDefault()
      copyHeadingLink(target)
    },
    [copyHeadingLink]
  )

  return (
    <section
      className={styles.postBody}
      onClick={handleHeadingClick}
      onKeyDown={handleHeadingKeyDown}
      role="presentation"
      dangerouslySetInnerHTML={{ __html: enhancedContent }}
    />
  )
}

export default PostBody
