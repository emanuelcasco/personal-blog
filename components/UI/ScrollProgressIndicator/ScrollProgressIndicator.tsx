import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from 'react'

import * as styles from './ScrollProgressIndicator.css'

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max)

type ScrollProgressIndicatorProps = {
  showOnRef?: RefObject<HTMLElement | null>
}

function ScrollProgressIndicator({ showOnRef }: ScrollProgressIndicatorProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isActive, setIsActive] = useState(() => !showOnRef)
  const rafRef = useRef<number>()

  const updateProgress = useCallback(() => {
    const { documentElement } = document
    const { scrollTop, scrollHeight, clientHeight } = documentElement
    const total = scrollHeight - clientHeight
    if (total <= 0) {
      setProgress(0)
      return
    }
    const ratio = clamp(scrollTop / total, 0, 1)
    setProgress((current) =>
      Math.abs(current - ratio) > 0.001 ? ratio : current
    )
    if (showOnRef?.current) {
      const { bottom, top } = showOnRef.current.getBoundingClientRect()
      const shouldBeActive = top <= 0 && bottom > 0
      setIsActive((current) =>
        current === shouldBeActive ? current : shouldBeActive
      )
    } else if (!showOnRef) {
      setIsActive(true)
    }
  }, [showOnRef])

  const scrollToRatio = useCallback((ratio: number) => {
    const { documentElement } = document
    const maxScroll =
      documentElement.scrollHeight - documentElement.clientHeight
    if (maxScroll <= 0) return
    window.scrollTo({ top: maxScroll * clamp(ratio, 0, 1), behavior: 'auto' })
  }, [])

  const updateScrollFromPointer = useCallback(
    (clientY: number) => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      if (!rect.height) return
      const offset = clamp(clientY - rect.top, 0, rect.height)
      scrollToRatio(offset / rect.height)
    },
    [scrollToRatio]
  )

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragging(true)
      updateScrollFromPointer(event.clientY)
    },
    [updateScrollFromPointer]
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      rafRef.current = window.requestAnimationFrame(updateProgress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [updateProgress])

  useEffect(() => {
    if (!isDragging) return

    const handleMove = (event: PointerEvent) => {
      event.preventDefault()
      updateScrollFromPointer(event.clientY)
    }

    const handleUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('pointermove', handleMove, { passive: false })
    window.addEventListener('pointerup', handleUp)
    window.addEventListener('pointercancel', handleUp)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleUp)
      window.removeEventListener('pointercancel', handleUp)
    }
  }, [isDragging, updateScrollFromPointer])

  const percentage = useMemo(() => Math.round(progress * 100), [progress])

  if (!isActive) return null

  return (
    <div
      className={styles.container}
      aria-hidden={percentage === 0 ? undefined : false}
    >
      <div
        ref={trackRef}
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        onPointerDown={handlePointerDown}
      >
        <div
          className={styles.fill}
          style={{ transform: `scaleY(${progress})` }}
        />
        <div className={styles.thumb} style={{ top: `${progress * 100}%` }} />
      </div>
    </div>
  )
}

export default ScrollProgressIndicator
