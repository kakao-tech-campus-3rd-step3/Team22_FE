import MapSetting from '@/components/map/MapSetting.tsx'
import { MapCenterMarker } from '@/components/map/MapCenterMarker.tsx'
import ButtonBar from '@/components/map/ButtonBar.tsx'
import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import useLocation from '@/hooks/useLocation.tsx'
import { useRef } from 'react'
import useKakaoMap from '@/hooks/useKakaoMap.tsx'

export default function LocationSetting() {
  const loaded = useKakaoMapLoader();
  const { location, status } = useLocation();
  const mapRef = useRef<HTMLDivElement | null>(null);

  useKakaoMap({ mapRef, location, loaded });

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
        <ButtonBar />
      </div>
      <MapSetting mapRef={mapRef} />
    </div>
  )
}
