import ButtonBar from '@/components/common/ButtonBar.tsx'
import WeatherTable from '@/components/common/WeatherTable.tsx'
import WalkTimeScheduler from '@/components/common/WalkTimeScheduler.tsx'
import { useNavigate } from '@tanstack/react-router'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import { useEffect, useState } from 'react'

export default function WalkingTimeSettingPage() {
  const navigate = useNavigate({ from: '/walk-time-setting' });
  const [walkTimesEmpty, setWalkTimesEmpty] = useState(false);
  const { walkTimes } = useMapSetupStore();

  useEffect(() => {
    if (walkTimes.length !== 0) {
      setWalkTimesEmpty(false);
    }
  }, [walkTimes])

  const handleSetTime = () => {
    if (walkTimes.length === 0) return setWalkTimesEmpty(true);

    navigate({
      to: '/map-setup',
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-800 font-sans">
      <div className="w-[390px] h-[844px] bg-[#121212] text-white shadow-2xl rounded-3xl overflow-y-auto p-6 space-y-6">
        <div className="relative w-full h-full">
          <WeatherTable />
          <WalkTimeScheduler />
          <div className="flex justify-center">
            {walkTimesEmpty && <span className="text-red-500 text-xs">산책 시간을 설정해 주세요.</span>}
          </div>
          <div className="w-full flex justify-center my-2">
            <span className="w-[90%] max-w-lg px-4 py-3 text-center text-white text-sm leading-relaxed font-bold bg-zinc-800 rounded-lg shadow-md">
              시간을 모두 상세하게 설정해주세요.
              <br />
              최고의 산책길인지도 판단해드릴게요.
            </span>
          </div>
          <div className="absolute bottom-0 left-0 w-full z-10 ">
            <ButtonBar buttonText="주 산책 시간 설정하기" onButtonClick={handleSetTime}>
              <div className="text-white my-1.5">해당 시간에 알림 경로 추천 알림 받기</div>
            </ButtonBar>
          </div>
        </div>
      </div>
    </div>
  )
}
