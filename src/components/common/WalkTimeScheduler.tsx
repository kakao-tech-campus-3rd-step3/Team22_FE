import { useState } from 'react';
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import { DAY } from '@/constant/day.ts'

export default function WalkTimeScheduler() {
  const { walkTimes, addWalkTime, removeWalkTime } = useMapSetupStore();
  const [currentTime, setCurrentTime] = useState({ day: '월', hour: '18', minute: '00' });
  const [duplicateMessage, setDuplicateMessage] = useState('');

  const handleAddTime = () => {
    const wasAdded = addWalkTime(currentTime);

    if (!wasAdded) {
      setDuplicateMessage("이미 추가된 시간입니다.");
    } else {
      setDuplicateMessage('');
    }
  };

  const handleRemoveTime = (idToRemove: number) => {
    removeWalkTime(idToRemove);
  };

  return (
    <div className="w-full flex justify-center my-6">
      <div className="w-[90%] max-w-lg h-50 bg-zinc-800 rounded-lg p-4 text-white shadow-lg max-h-60 overflow-auto no-scrollbar">
        <div className="mb-3 text-lg font-bold text-center">주로 산책하는 시간 고르기</div>

        <div className="flex justify-center gap-2 mb-3">
          <select
            value={currentTime.day}
            onChange={(e) => setCurrentTime({ ...currentTime, day: e.target.value })}
            className="bg-zinc-700 text-white px-3 py-1 rounded hover:bg-zinc-600"
          >
            {DAY.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>

          <select
            value={currentTime.hour}
            onChange={(e) => setCurrentTime({ ...currentTime, hour: e.target.value })}
            className="bg-zinc-700 text-white px-3 py-1 rounded hover:bg-zinc-600"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, '0')}>{i}시</option>
            ))}
          </select>

          <select
            value={currentTime.minute}
            onChange={(e) => setCurrentTime({ ...currentTime, minute: e.target.value })}
            className="bg-zinc-700 text-white px-3 py-1 rounded hover:bg-zinc-600"
          >
            {Array.from({ length: 6 }, (_, i) => {
              const minute = i * 10;
              return (
                <option key={i} value={minute.toString().padStart(2, '0')}>
                  {minute}분
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={handleAddTime}
          className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg font-bold mb-3 transition-colors"
        >
          산책 시간 추가하기
        </button>

        {duplicateMessage && (
          <div className="text-red-500 text-center mb-2 font-bold">{duplicateMessage}</div>
        )}

        <div className="flex flex-col gap-2 overflow-auto">
          {walkTimes.length > 0 ? (
            walkTimes.map((time) => (
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
            ))
          ) : (
            <div className="text-center text-zinc-400">산책 시간을 추가해 주세요.</div>
          )}
        </div>
      </div>
    </div>
  );
}
