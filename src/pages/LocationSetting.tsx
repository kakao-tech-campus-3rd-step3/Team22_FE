import MapSetting from '@/components/map/MapSetting.tsx'
import { MapCenterMarker } from '@/components/map/MapCenterMarker.tsx'
import ButtonBar from '@/components/common/ButtonBar.tsx'
import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import useLocation from '@/hooks/useLocation.tsx'
import { useRef } from 'react'
import useKakaoMap from '@/hooks/useKakaoMap.tsx'
import { useNavigate } from '@tanstack/react-router'

export default function LocationSetting() {
  const loaded = useKakaoMapLoader();
  const { location, status } = useLocation();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { address, place } = useKakaoMap({ mapRef, location, loaded });
  const navigate = useNavigate({ from: '/' });
  const handleSetLocation = () => {
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
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <MapCenterMarker />
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 20,
        pointerEvents: 'auto',
      }}>
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
