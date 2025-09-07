import MapSetting from '@/components/map/MapSetting.tsx'
import startMarker from '@/assets/icons/startMarker.png';
import ButtonBar from '@/components/common/ButtonBar.tsx'
import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import useLocation from '@/hooks/useLocation.tsx'
import { useRef } from 'react'
import useKakaoMap from '@/hooks/useKakaoMap.tsx'
import { useNavigate } from '@tanstack/react-router'
import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import { MARKER_IMAGE_HEIGHT, MARKER_IMAGE_WIDTH } from '@/constant/marker.ts'

export default function LocationSetting() {
  const loaded = useKakaoMapLoader();
  const { location, status } = useLocation();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { address, place, centerLocation } = useKakaoMap({ mapRef, location, loaded });
  const setLocation = useMapSetupStore((state) => state.setLocation);
  const navigate = useNavigate({ from: '/' });

  const handleSetLocation = () => {
    setLocation(address, place, centerLocation.latitude, centerLocation.longitude);
    console.log(`위치 설정 완료! 장소: ${place}, 주소: ${address}`);
    navigate({
      to: '/walking-time',
    });
  };

  if (!loaded) {
    return <div>지도를 불러오는 중입니다...</div>
  }

  if (status === 'loading') {
    return <div>현재 위치를 찾는 중입니다...</div>
  }

  if (status === 'denied') {
    return (
      <>
        <div>위치 권한을 허용해주세요.</div>
        <div id='map' style={{ width: "100%", height: "100%" }} />;
      </>
    )
  }

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-10 pointer-events-none">
        <img
          src={startMarker}
          alt="중심 위치 마커"
          className={`w-[${MARKER_IMAGE_WIDTH}] h-${MARKER_IMAGE_HEIGHT}]`}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 w-full z-20 pointer-events-auto">
        <ButtonBar
          buttonText='주 산책 시작 위치설정하기'
          onButtonClick={handleSetLocation}
        >
          <div className="text-white my-1.5">장소: {place}</div>
          <div className="text-white my-1.5">위치: {address}</div>
        </ButtonBar>
      </div>
      <MapSetting mapRef={mapRef} />
    </div>
  )
}
