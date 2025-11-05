import { useState } from 'react'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import { DAY, HOURS, MINUTES } from '@/constants/day.ts'
import CustomSelect from './CustomSelect'

export default function WalkTimeScheduler() {
  const { walkTimes, addWalkTime, removeWalkTime } = useMapSetupStore()
  const [currentTime, setCurrentTime] = useState({ day: '월', hour: '18', minute: '00' })
  const [duplicateMessage, setDuplicateMessage] = useState('')

  const handleAddTime = () => {
    const wasAdded = addWalkTime(currentTime)
    setDuplicateMessage(wasAdded ? '' : '이미 추가된 시간입니다.')
  }

  const handleRemoveTime = (idToRemove: number) => {
    removeWalkTime(idToRemove)
  }

  return (
    <div className="w-full h-3/4 max-w-lg mx-auto bg-zinc-800 rounded-lg p-4 text-white shadow-lg max-h-full overflow-auto no-scrollbar">
      <p className="mb-3 text-lg font-bold text-center">주로 산책하는 시간 고르기</p>
      {duplicateMessage && (
        <p className="text-red-500 text-center mb-2 font-bold">{duplicateMessage}</p>
      )}
      <div className="flex justify-center gap-5 mb-3">
        <CustomSelect
          value={currentTime.day}
          options={DAY}
          onChange={(day) => setCurrentTime({ ...currentTime, day })}
        />
        <CustomSelect
          value={currentTime.hour}
          options={HOURS}
          onChange={(hour) => setCurrentTime({ ...currentTime, hour })}
        />
        <CustomSelect
          value={currentTime.minute}
          options={MINUTES}
          onChange={(minute) => setCurrentTime({ ...currentTime, minute })}
        />
      </div>

      <button
        onClick={handleAddTime}
        className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg font-bold mb-3 transition-colors"
      >
        산책 시간 추가하기
      </button>

      <div className="flex flex-col gap-2 overflow-y-auto h-full bg-zinc-900">
        {walkTimes.map((time) => (
          <div
            key={time.id}
            className="flex justify-between items-center bg-zinc-700 px-3 py-1 rounded shadow"
          >
            <span>{`${time.day}요일 ${time.hour}:${time.minute}`}</span>
            <button
              onClick={() => handleRemoveTime(time.id)}
              className="bg-red-600 hover:bg-red-500 text-white px-2 py-0.5 rounded font-bold text-sm transition-colors"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
