import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import MapSetting from '@/components/map/MapSetting.tsx'
import useLocation from '@/hooks/useLocation.ts'
import { useEffect, useState } from 'react'
import useKakaoRouteMap from '@/hooks/useKakaoRouteMap.tsx'
import WalkingTimerBar from '@/components/map/WalkingTimerBar.tsx'
import useDistance from '@/hooks/useDistance.ts'
import WalkingEndModalComponent from '@/components/map/WalkingEndModalComponent.tsx'

export default function RouteDrawPage() {
  const loaded = useKakaoMapLoader()
  const [isActive, setIsActive] = useState(false)
  const [endModal, setEndModal] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const { location: currentLocation, status } = useLocation()
  const { latitude, longitude } = useMapSetupStore()
  const [route, setRoute] = useState<{ lat: number; lng: number }[]>([])
  const { mapContainerRef } = useKakaoRouteMap({
    loaded,
    latitude,
    longitude,
    route,
    currentLocation,
  })
  const { totalDistance, setTotalDistance, startDistance } = useDistance({
    route,
    currentLocation,
    latitude,
    longitude,
  })

  useEffect(() => {
    if (!isActive) return

    if (status === 'success') {
      setRoute((prev) => [
        ...prev,
        { lat: currentLocation.latitude, lng: currentLocation.longitude },
      ])
    }
  }, [currentLocation.latitude, currentLocation.longitude, status, isActive])

  const handleTriggerEnd = () => {
    setIsActive(false)
    setEndModal(true)
  }

  const handleEndWalking = () => {
    setTotalDistance(0)
    setElapsedTime(0)
    setRoute([])
    setIsActive(false)
    setEndModal(false)
  }

  if (!loaded) return <div>지도 불러오는 중...</div>

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-800 font-sans">
      <div
        className="relative w-[390px] h-[844px] bg-[#121212] text-white shadow-2xl rounded-3xl overflow-y-auto p-6 space-y-6">
        <div className="w-full h-full">
          <MapSetting mapRef={mapContainerRef} />
          {endModal ? (
            <WalkingEndModalComponent
              totalDistance={totalDistance}
              elapsedTime={elapsedTime}
              route={route}
              setEndModal={setEndModal}
              handleEndWalking={handleEndWalking}
            />
          ) : (
            <div className="absolute bottom-0 left-0 w-full z-10 ">
              <WalkingTimerBar
                totalDistance={totalDistance}
                setTotalDistance={setTotalDistance}
                isActive={isActive}
                setIsActive={setIsActive}
                route={route}
                setRoute={setRoute}
                startDistance={startDistance}
                handleTriggerEnd={handleTriggerEnd}
                elapsedTime={elapsedTime}
                setElapsedTime={setElapsedTime}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
