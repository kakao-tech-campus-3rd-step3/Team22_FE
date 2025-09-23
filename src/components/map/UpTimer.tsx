import { useEffect, useRef, useState } from 'react'

export default function UpTimer(props: { isActive: boolean; stop: boolean }) {
  const { isActive, stop } = props
  const [elapsedTime, setElapsedTime] = useState(0)
  const startTimeRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (stop) {
      setElapsedTime(0)
      return
    }

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
  }, [stop, elapsedTime, isActive])

  const totalSeconds = Math.floor(elapsedTime / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return (
    <div className="flex flex-col items-center">
      <span>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
      <span>시간</span>
    </div>
  )
}
