import MapSetting from '@/components/map/MapSetting.tsx'
import startMarker from '@/assets/icons/StartMarker.png'
import ButtonBar from '@/components/common/ButtonBar.tsx'
import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import useLocation from '@/hooks/useLocation.tsx'
import { useRef } from 'react'
import useKakaoMap from '@/hooks/useKakaoMap.tsx'
import { useNavigate } from '@tanstack/react-router'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'

export default function LocationSetting() {
  const loaded = useKakaoMapLoader()
  const { location, status } = useLocation()
  const mapRef = useRef<HTMLDivElement>(null!)
  const { address, place, centerLocation } = useKakaoMap({ mapRef, location, loaded })
  const setLocation = useMapSetupStore((state) => state.setLocation)
  const navigate = useNavigate({ from: '/' })

  const handleSetLocation = () => {
    setLocation(address, place, centerLocation.latitude, centerLocation.longitude)
    console.log(`위치 설정 완료! 장소: ${place}, 주소: ${address}`)
    navigate({
      to: '/walk-time-setting',
    })
  }

  if (!loaded) {
    return <div>지도를 불러오는 중입니다...</div>
  }

  if (status === 'loading') {
    console.log('loading중')
    return <div>현재 위치를 찾는 중입니다...</div>
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
    <div className="flex justify-center items-center min-h-screen bg-neutral-800 font-sans">
      <div className="w-[390px] h-[844px] bg-[#121212] text-white shadow-2xl rounded-3xl overflow-y-auto p-6 space-y-6">
        <div className="relative w-full h-full">
          <MapSetting mapRef={mapRef} />
          <img
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 pointer-events-none w-[50px] h-[40px]"
            src={startMarker}
          />
          <div className="absolute bottom-0 left-0 w-full z-10 ">
            <ButtonBar buttonText="주 산책 시작 위치설정하기" onButtonClick={handleSetLocation}>
              <div className="text-white my-1.5">장소: {place}</div>
              <div className="text-white my-1.5">위치: {address}</div>
            </ButtonBar>
          </div>
        </div>
      </div>
    </div>
  )
}
