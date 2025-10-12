import InfoRow from '@/components/common/InfoRow'
import WeatherTable from '@/components/common/WeatherTable'
import useAuthStore from '@/stores/authStore'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getPaths } from '@/api/walks'
import { useSetupStore } from '@/stores/setupStore'
import { useUIStore } from '@/stores/uiStore'
import useKakaoStaticMap from '@/hooks/useKakaoStaticMap'
import { useMapSetupStore } from '@/hooks/useMapSetupStore'
import useKakaoMapLoader from '@/hooks/useKakaoMapLoader'

export default function MainPage() {
  const getMainRoute = getPaths()
  console.log(getMainRoute + '<--getMainRoute') // 확인용입니다.
  const username = useAuthStore((state) => state.username)
  const navigate = useNavigate()

  const isAllDone = useSetupStore(
    (s) => s.isPetSettingDone && s.isLocationSettingDone && s.isRouteDrawDone,
  )
  const setShowNavbar = useUIStore((state) => state.setShowNavbar)
  const loaded = useKakaoMapLoader()
  const { latitude, longitude } = useMapSetupStore()
  const { mapContainerRef } = useKakaoStaticMap({ latitude, longitude, loaded })

  useEffect(() => {
    if (isAllDone === false) {
      navigate({ to: '/intro' })
    }
    setShowNavbar(true)
  }, [isAllDone, navigate, setShowNavbar])

  return (
    <div className="flex flex-col items-stretch  ">
      <div className="flex flex-col w-full max-w-screen-sm mx-auto gap-10 ">
        <InfoRow label="">
          <div className="bg-neutral-800 rounded-lg shadow-xl p-6 w-full">
            <span>{username}</span>
          </div>
        </InfoRow>
        <WeatherTable />
        <div ref={mapContainerRef} className="w-full  rounded-xl h-72" />
      </div>
    </div>
  )
}
