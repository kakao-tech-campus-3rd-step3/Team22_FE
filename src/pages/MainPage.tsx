import CardBox from '@/components/common/CardBox'
import InfoRow from '@/components/common/InfoRow'
import WeatherTable from '@/components/common/WeatherTable'
import useAuthStore from '@/stores/authStore'
import { useNavigate } from '@tanstack/react-router'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import { useState } from 'react'
import ConfirmModal from '@/components/common/ConfirmModal'

export default function MainPage() {
  const username = useAuthStore((state) => state.username)
  const navigate = useNavigate()
  const isMapSetup = useMapSetupStore((state) => !!state.place)
  const [isMapSetopen, setisMapSetopen] = useState(false)

  const handleCardClick = () => {
    if (isMapSetup) {
      navigate({ to: `/map-setup` })
    } else {
      setisMapSetopen(true)
    }
  }
  const handleConfirm = () => {
    setisMapSetopen(false)
    navigate({ to: `/location-setting` })
  }

  const handleClose = () => {
    setisMapSetopen(false)
  }

  return (
    <div className="flex flex-col gap-10">
      <InfoRow label="">
        <div className="flex flex-col bg-neutral-800 rounded-lg shadow-xl p-6 w-full">
          <span>{username}</span>
        </div>
      </InfoRow>
      <WeatherTable />
      <CardBox onClick={handleCardClick} />
      <ConfirmModal
        isOpen={isMapSetopen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="경로 설정"
      >
        앗! 현재 설정된 주 경로가 없어요.
        <br />
        지금 설정하러 가볼까요?
      </ConfirmModal>
    </div>
  )
}
