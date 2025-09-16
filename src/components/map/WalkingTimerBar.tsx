import { GrStopFill } from 'react-icons/gr'
import { IoPause } from 'react-icons/io5'

export default function WalkingTimerBar() {
  return (
    <div className="w-full">
      <div
        className="
          absolute bottom-0 left-0 w-full
          flex flex-col px-4 py-4 bg-zinc-900 font-bold"
      >
        <div className="flex justify-around items-center text-center">
          <div className="flex flex-col items-center">
            <span>0.0</span>
            <span>거리(km)</span>
          </div>
          <div className="h-10 w-px bg-zinc-700" />
          <div className="flex flex-col items-center">
            <span>00:00</span>
            <span>시간(분)</span>
          </div>
        </div>

        <div className="flex flex-row justify-around items-center text-center py-8">
          <button className="bg-neutral-800 rounded-full border border-indigo-600 p-4 cursor-pointer">
            <IoPause className="w-8 h-8" />
          </button>
          <button className="bg-neutral-800 rounded-full border border-indigo-600 p-4 cursor-pointer">
            <GrStopFill className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  )
}
