import { GrStopFill } from 'react-icons/gr'
import { IoPause } from 'react-icons/io5'
import { PiPlayFill } from 'react-icons/pi'
import UpTimer from '@/components/map/UpTimer.tsx'
import { DISTANCE_KM, MAX_START_DISTANCE } from '@/constants/location.ts'
import { useState } from 'react'

export default function WalkingTimerBar(props: {
  totalDistance: number
  setTotalDistance: (value: number) => void
  isActive: boolean
  setIsActive: (value: boolean) => void
  route: { lat: number; lng: number }[]
  setRoute: (value: { lat: number; lng: number }[]) => void
  startDistance: number
  handleTriggerEnd: () => void
  elapsedTime: number
  setElapsedTime: (value: number) => void
}) {
  const { totalDistance, setTotalDistance, isActive, setIsActive, route, setRoute, startDistance } =
    props

  const [stop, setStop] = useState(false)

  const onHandleOpenWaliking = () => {
    if (startDistance > MAX_START_DISTANCE && route.length === 0) {
      alert('시작 위치와 거리가 너무 멉니다!')
      return
    }
    setStop(false)
    setIsActive(true)
  }

  const onHandleStopWalking = () => {
    setStop(true)
    setTotalDistance(0)
    setRoute([])
    setIsActive(false)
  }

  const onHandleEndWalking = () => {
    props.handleTriggerEnd()
  }

  return (
    <div className="w-full">
      <div
        className="
          absolute bottom-0 left-0 w-full
          flex flex-col px-4 py-4 bg-zinc-900 font-bold"
      >
        <div className="flex justify-around items-center text-center">
          <div className="flex flex-col items-center">
            <span>{(totalDistance / DISTANCE_KM).toFixed(2)}</span>
            <span>거리(km)</span>
          </div>
          <div className="h-10 w-px bg-zinc-700" />
          <UpTimer isActive={props.isActive} stop={stop} elapsedTime={props.elapsedTime} setElapsedTime={props.setElapsedTime} />
        </div>
        <div className="flex flex-row justify-around items-center text-center py-4">
          {props.isActive ? (
            <button
              className="bg-neutral-800 rounded-full border border-indigo-600 p-4 cursor-pointer"
              onClick={() => setIsActive(false)}
            >
              <IoPause className="w-8 h-8" />
            </button>
          ) : (
            <button
              className="bg-neutral-800 rounded-full border border-indigo-600 p-4 cursor-pointer"
              onClick={onHandleOpenWaliking}
            >
              <PiPlayFill className="w-8 h-8" />
            </button>
          )}
          <button
            className="bg-neutral-800 rounded-full border border-indigo-600 p-4 cursor-pointer"
            onClick={onHandleStopWalking}
          >
            <GrStopFill
              className="w-8 h-8"
            />
          </button>
        </div>
        <button
          onClick={onHandleEndWalking}
          className="bg-red-500 rounded-xl py-2 cursor-pointer"
        >
          종료하기
        </button>
      </div>
    </div>
  )
}
