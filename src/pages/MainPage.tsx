import CardBox from '@/components/common/CardBox'
import InfoRow from '@/components/common/InfoRow'
import WeatherTable from '@/components/common/WeatherTable'
import useAuthStore from '@/stores/authStore'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import ConfirmModal from '@/components/common/ConfirmModal'
import { getPaths } from '@/api/walks'
import { useSetupStore } from '@/stores/setupStore'
import IntroPage from './IntroPage'

export default function MainPage() {
  const getMainRoute = getPaths()
  console.log(getMainRoute + '<--getMainRoute') // 확인용입니다.
  const username = useAuthStore((state) => state.username)
  const navigate = useNavigate()
  const [isMapSetopen, setisMapSetopen] = useState(false)
  const isAllDone = useSetupStore((g) => g.isAllDone())

  useEffect(() => {
    if (isAllDone === false) {
      navigate({ to: '/intro' })
    }
  })

  const handleCardClick = () => {
    setisMapSetopen(true)
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
        title="이용 순서 안내"
        isButtonVisible={false}
      >
        <IntroPage />
      </ConfirmModal>
    </div>
  )
}
