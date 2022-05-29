import { useEffect, useRef } from 'react'

export type IntervalCallback = () => void

function useInterval(callback: IntervalCallback, delay: number) {
  const savedCallback = useRef<IntervalCallback>()
  // Store executed callback...
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])
  // Set up the interval.
  useEffect(() => {
    const id = setInterval(() => {
      if (savedCallback.current) savedCallback.current()
    }, delay)
    return () => clearInterval(id)
  }, [delay])
}

export default useInterval
