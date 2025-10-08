import ButtonBar from '@/components/common/ButtonBar.tsx'
import WeatherTable from '@/components/common/WeatherTable.tsx'
import WalkTimeScheduler from '@/components/common/WalkTimeScheduler.tsx'
import { useNavigate } from '@tanstack/react-router'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import { useUIStore } from '@/stores/uiStore'
import { useEffect } from 'react'

export default function WalkingTimeSettingPage() {
  const navigate = useNavigate({ from: '/walk-time-setting' })
  const { walkTimes } = useMapSetupStore()
  const setShowNavbar = useUIStore((state) => state.setShowNavbar)
  useEffect(() => setShowNavbar(false))

  const isWalkTimesEmpty = walkTimes.length === 0

  const handleSetTime = () => {
    if (isWalkTimesEmpty) return

    navigate({
      to: '/map-setup',
    })
  }

  return (
    <div className="flex flex-col gap-3 relative w-full h-full">
      <WeatherTable />
      <WalkTimeScheduler />
      <div className="flex justify-center"></div>
      <ButtonBar
        buttonText="주 산책 시간 설정하기"
        onButtonClick={handleSetTime}
        isButtonDisable={isWalkTimesEmpty}
      >
        <p className="text-white my-1.5">해당 시간에 알림 경로 추천 알림 받기</p>
      </ButtonBar>
    </div>
  )
}
