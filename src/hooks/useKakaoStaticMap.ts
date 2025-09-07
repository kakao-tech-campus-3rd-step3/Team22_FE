import { useEffect, useRef } from 'react'
import startMarker from '@/assets/icons/startMarker.png';
import { MARKER_IMAGE_HEIGHT, MARKER_IMAGE_WIDTH, MARKER_IMAGE_X, MARKER_IMAGE_Y } from '@/constant/marker.ts'

interface useKakaoStaticMapProps {
  latitude: number | null;
  longitude: number | null;
  loaded: boolean;
}

export default function useKakaoStaticMap({ latitude, longitude, loaded }: useKakaoStaticMapProps) {
  const mapContainerRef  = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  const markerInstanceRef = useRef<KakaoMarker | null>(null);

  useEffect(() => {
    if (!loaded || latitude == null || longitude == null || !mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const startPosition = new window.kakao.maps.LatLng(latitude, longitude);
    const mapOption = {
      center: startPosition,
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainerRef.current, mapOption);
    mapInstanceRef.current = map;

    const imageSrc = startMarker;
    const imageSize = new window.kakao.maps.Size(MARKER_IMAGE_WIDTH, MARKER_IMAGE_HEIGHT);
    const imageOption = { offset: new window.kakao.maps.Point(MARKER_IMAGE_X, MARKER_IMAGE_Y) };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    const marker = new window.kakao.maps.Marker({
      position: startPosition,
      image: markerImage,
    });
    markerInstanceRef.current = marker;

    marker.setMap(map);

  }, [loaded, latitude, longitude]);

  useEffect(() => {
    if (!mapInstanceRef.current || !markerInstanceRef.current || latitude == null || longitude == null) return;

    const newPosition = new window.kakao.maps.LatLng(latitude, longitude);

    mapInstanceRef.current?.panTo(newPosition);
    markerInstanceRef.current?.setPosition(newPosition);
  }, [latitude, longitude]);

  return {
    mapContainerRef
  };
}
