import { useEffect, useRef } from 'react'
import startMarker from '@/assets/icons/startMarker.png';

interface useKakaoStaticMapProps {
  latitude: number | null;
  longitude: number | null;
  loaded: boolean;
}

export default function useKakaoStaticMap({ latitude, longitude, loaded }: useKakaoStaticMapProps) {
  const mapContainerRef  = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loaded || !latitude || !longitude) return;

    const startPosition = new window.kakao.maps.LatLng(latitude, longitude);

    const mapOption = {
      center: startPosition,
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainerRef.current, mapOption);

    const markerPosition = startPosition;

    const imageSrc = startMarker;
    const imageSize = new window.kakao.maps.Size(50, 40);
    const imageOption = { offset: new window.kakao.maps.Point(20, 40) };

    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    marker.setMap(map);

  }, [loaded, latitude, longitude]);

  return {
    mapContainerRef
  };
}
