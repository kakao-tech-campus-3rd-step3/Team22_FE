import { GrStopFill } from 'react-icons/gr'
import { IoPause } from 'react-icons/io5'
import { PiPlayFill } from "react-icons/pi";
import { useState } from 'react'
import UpTimer from '@/components/map/UpTimer.tsx'

export default function WalkingTimerBar(props: {
  totalDistance: number
  setTotalDistance: (value: number) => void
  isActive: boolean
  setIsActive: (value: boolean) => void
  route: { lat: number, lng: number}[]
  setRoute: (value: { lat: number, lng: number }[]) => void
}) {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const onHandleEndWalking = () => {
    console.log("데이터", {
      "totalDistance_m": props.totalDistance,
      "walkingTime_sec": minutes * 60 + seconds,
      "path": props.route
    })

    setSeconds(0);
    setMinutes(0);
    props.setTotalDistance(0);
    props.setRoute([]);
    props.setIsActive(false)
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
            <span>{(props.totalDistance / 1000).toFixed(2)}</span>
            <span>거리(km)</span>
          </div>
          <div className="h-10 w-px bg-zinc-700" />
          <UpTimer seconds={seconds} setSeconds={setSeconds} minutes={minutes} setMinutes={setMinutes} isActive={props.isActive} />
        </div>
        <div className="flex flex-row justify-around items-center text-center py-8">
          {props.isActive ? (
            <button
              className="bg-neutral-800 rounded-full border border-indigo-600 p-4 cursor-pointer"
              onClick={() => props.setIsActive(false)}
            >
              <PiPlayFill className="w-8 h-8" />
            </button>) : (
            <button
              className="bg-neutral-800 rounded-full border border-indigo-600 p-4 cursor-pointer"
              onClick={() => props.setIsActive(true)}
            >
              <IoPause className="w-8 h-8" />
            </button>
          )}
          <button
            className="bg-neutral-800 rounded-full border border-indigo-600 p-4 cursor-pointer"
            onClick={onHandleEndWalking}
          >
            <GrStopFill className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  )
}
