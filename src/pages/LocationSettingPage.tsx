import MapSetting from '@/components/map/MapSetting.tsx'
import startMarker from '@/assets/icons/StartMarker.png'
import ButtonBar from '@/components/common/ButtonBar.tsx'
import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import useLocation from '@/hooks/useLocation.ts'
import { useRef } from 'react'
import useKakaoMap from '@/hooks/useKakaoMap.tsx'
import { useNavigate } from '@tanstack/react-router'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import LoadingBox from '@/components/common/LoadingBox'

export default function LocationSettingPage() {
  const loaded = useKakaoMapLoader()
  const { location, status } = useLocation()
  const mapRef = useRef<HTMLDivElement>(null!)
  const { address, place, centerLocation } = useKakaoMap({ mapRef, location, loaded })
  const setLocation = useMapSetupStore((state) => state.setLocation)
  const navigate = useNavigate({ from: '/location-setting' })

  const handleSetLocation = () => {
    setLocation(address, place, centerLocation.latitude, centerLocation.longitude)
    navigate({
      to: '/walk-time-setting',
    })
  }

  if (!loaded) {
    return (
      <div className="w-full h-full">
        <LoadingBox hsize="full"></LoadingBox>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="w-full h-full">
        <LoadingBox hsize="full"></LoadingBox>
      </div>
    )
  }

  if (status === 'denied') {
    return (
      <>
        <div>위치 권한을 허용해주세요.</div>
        <div id="map" className="w-full h-full" />;
      </>
    )
  }

  return (
    <div className="relative w-full h-full">
      <MapSetting mapRef={mapRef} />
      <img
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 pointer-events-none w-[50px] h-[40px]"
        src={startMarker}
        alt="시작 마커"
      />
      <div className="absolute bottom-0 left-0 w-full z-10 ">
        <ButtonBar
          buttonText="주 산책 시작 위치설정하기"
          onButtonClick={handleSetLocation}
          isButtonDisable={false}
        >
          <div className="text-white my-1.5">장소: {place}</div>
          <div className="text-white my-1.5">위치: {address}</div>
        </ButtonBar>
      </div>
    </div>
  )
}
