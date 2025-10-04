import { useEffect, useRef } from 'react'
import { formatTime } from '@/utils/timeCalculation.ts'

export default function UpTimer(props: {
  isActive: boolean
  stop: boolean
  elapsedTime: number
  setElapsedTime: (value: number) => void
}) {
  const { isActive, stop, elapsedTime, setElapsedTime } = props
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (isActive) {
      startTimeRef.current = Date.now() - elapsedTime
      intervalRef.current = window.setInterval(() => {
        setElapsedTime(Date.now() - (startTimeRef.current ?? 0))
      }, 1000)
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current)
      }
    }
  }, [elapsedTime, isActive, setElapsedTime])

  useEffect(() => {
    if (stop) {
      setElapsedTime(0)
    }
  }, [stop, setElapsedTime])

  return (
    <div className="flex flex-col items-center">
      <span>{formatTime(elapsedTime)}</span>
      <span>시간</span>
    </div>
  )
}
