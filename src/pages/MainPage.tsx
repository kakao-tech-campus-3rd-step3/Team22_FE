import CardBox from '@/components/common/CardBox'
import InfoRow from '@/components/common/InfoRow'
import WeatherTable from '@/components/common/WeatherTable'
import useAuthStore from '@/stores/authStore'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { getPaths } from '@/api/walks'
import { useSetupStore } from '@/stores/setupStore'
import { useUIStore } from '@/stores/uiStore'

export default function MainPage() {
  const getMainRoute = getPaths()
  console.log(getMainRoute + '<--getMainRoute') // 확인용입니다.
  const username = useAuthStore((state) => state.username)
  const navigate = useNavigate()
  const [, setisMapSetopen] = useState(false)
  const isAllDone = useSetupStore(
    (s) => s.isPetSettingDone && s.isLocationSettingDone && s.isRouteDrawDone,
  )
  const setShowNavbar = useUIStore((state) => state.setShowNavbar)

  useEffect(() => {
    if (isAllDone === false) {
      navigate({ to: '/intro' })
    }
    setShowNavbar(true)
  }, [isAllDone, navigate, setShowNavbar])

  const handleCardClick = () => {
    setisMapSetopen(true)
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
    </div>
  )
}
