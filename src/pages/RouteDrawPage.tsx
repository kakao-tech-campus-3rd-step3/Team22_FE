import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import MapSetting from '@/components/map/MapSetting.tsx'
import useLocation from '@/hooks/useLocation.ts'
import { useCallback, useEffect, useState } from 'react'
import useKakaoRouteMap from '@/hooks/useKakaoRouteMap.tsx'
import WalkingTimerBar from '@/components/map/WalkingTimerBar.tsx'
import useDistance from '@/hooks/useDistance.ts'
import WalkingEndModalComponent from '@/components/map/WalkingEndModalComponent.tsx'

export default function RouteDrawPage(props: { onDone?: () => void; disableRouting?: boolean }) {
  const { onDone } = props
  const loaded = useKakaoMapLoader()
  const [isActive, setIsActive] = useState(false)
  const [endModal, setEndModal] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const { updatedLocation: currentLocation, status } = useLocation()
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
    if (!isActive || status !== 'success' || !currentLocation) return

    if (status === 'success') {
      setRoute((prev) => [
        ...prev,
        { lat: currentLocation.latitude, lng: currentLocation.longitude },
      ])
    }
  }, [currentLocation, status, isActive])

  const handleTriggerEnd = () => {
    setIsActive(false)
    setEndModal(true)
  }

  const handleEndWalking = useCallback(() => {
    setTotalDistance(0)
    setElapsedTime(0)
    setRoute([])
    setIsActive(false)
    setEndModal(false)
  }, [setTotalDistance, setElapsedTime, setRoute, setIsActive, setEndModal])

  if (!loaded) return <div>지도 불러오는 중...</div>

  return (
    <div className="relative w-full h-full">
      <MapSetting mapRef={mapContainerRef} />
      {endModal ? (
        <WalkingEndModalComponent
          totalDistance={totalDistance}
          elapsedTime={elapsedTime}
          route={route}
          setEndModal={setEndModal}
          handleEndWalking={handleEndWalking}
          onDone={onDone}
        />
      ) : (
        <div className="absolute bottom-0 left-0 w-full z-10">
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
  )
}
