import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'
import { useEffect } from 'react'

export default function MapSetting() {
  const loaded = useKakaoMapLoader();

  useEffect(() => {
    if (!loaded) return;

    const mapContainer = document.getElementById('map');
    const mapOptions = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    }
    new window.kakao.maps.Map(mapContainer, mapOptions);
  }, [loaded])

  return <div id='map' style={{ width: "100%", height: "500px" }} />;
}
