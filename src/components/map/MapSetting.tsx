import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import { useEffect } from 'react'
import useLocation from '@/hooks/useLocation.tsx'
import { createRoot } from 'react-dom/client'
import { LocationDotIcon } from '@/assets/icons/LocationDotIcon.tsx'
import { MapCenterMarker } from '@/components/map/MapCenterMarker.tsx'
import ButtonBar from '@/components/map/ButtonBar.tsx'

export default function MapSetting() {
  const loaded = useKakaoMapLoader();
  const { location, status } = useLocation();

  useEffect(() => {
    if (!loaded || !location) return;

    const mapContainer = document.getElementById('map');
    const currentPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);

    const mapOptions = {
      center: currentPosition,
      level: 3
    }
    const map = new window.kakao.maps.Map(mapContainer, mapOptions);

    const customOverlayContent = document.createElement('div');

    const customOverlay = new window.kakao.maps.CustomOverlay({
      position: currentPosition,
      content: customOverlayContent,
      xAnchor: 0.5,
      yAnchor: 0.5,
    });

    customOverlay.setMap(map);

    const root = createRoot(customOverlayContent);
    root.render(<LocationDotIcon />);

    return () => {
      customOverlay.setMap(null);
    }
  }, [loaded, location])

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
        pointEvents: 'none',
      }}>
        <MapCenterMarker />
      </div>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 20,
        pointEvents: 'auto',
      }}>
        <ButtonBar />
      </div>
      <div id='map' style={{ width: "100%", height: "100%" }} />
      ;

    </div>
  )
}
