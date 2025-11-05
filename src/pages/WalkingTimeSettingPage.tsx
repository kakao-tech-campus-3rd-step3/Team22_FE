import ButtonBar from '@/components/common/ButtonBar.tsx'
import WalkTimeScheduler from '@/components/common/WalkTimeScheduler.tsx'
import { useNavigate } from '@tanstack/react-router'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import { useUIStore } from '@/stores/uiStore'
import { useEffect } from 'react'

export default function WalkingTimeSettingPage(props: {
  onDone?: () => void
  disableRouting?: boolean
}) {
  const { onDone, disableRouting } = props
  const navigate = useNavigate({ from: '/walk-time-setting' })
  const { walkTimes } = useMapSetupStore()
  const setShowNavbar = useUIStore((state) => state.setShowNavbar)
  useEffect(() => setShowNavbar(false))

  const isWalkTimesEmpty = walkTimes.length === 0

  const handleSetTime = () => {
    if (isWalkTimesEmpty) return

    if (disableRouting && onDone) {
      onDone()
    } else {
      navigate({ to: '/map-setup' })
    }
  }
  return (
    <div className="flex flex-col gap-3 relative w-full h-full">
      <WalkTimeScheduler />
      <div className="flex justify-center"></div>
      <ButtonBar
        buttonText="주 산책 시간 설정하기"
        onButtonClick={handleSetTime}
        isButtonDisable={isWalkTimesEmpty}
      />
    </div>
  )
}
