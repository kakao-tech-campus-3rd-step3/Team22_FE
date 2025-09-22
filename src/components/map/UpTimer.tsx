import { useEffect, useRef } from 'react'

export default function UpTimer(props: {
  seconds: number,
  setSeconds: (value: number | ((prev: number) => number)) => void,
  minutes: number,
  setMinutes: (value: number | ((prev: number) => number)) => void;
  isActive: boolean,
}) {
  const { seconds, setSeconds, minutes, setMinutes, isActive } = props;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current!);
      }
    }
  }, [isActive, setSeconds]);

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }
  }, [seconds, minutes, setSeconds, setMinutes]);

  return (
    <div className="flex flex-col items-center">
      <span>{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</span>
      <span>시간</span>
    </div>
  )
}
