import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import { useRef } from 'react'
import useLocation from '@/hooks/useLocation.tsx'
import useKakaoMap from '@/hooks/useKakaoMap.tsx'

export default function MapSetting() {
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
      <div id='map' ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  )
}
