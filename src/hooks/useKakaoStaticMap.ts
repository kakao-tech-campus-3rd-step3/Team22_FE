import { useEffect, useRef } from 'react'
import startMarker from '@/assets/icons/startMarker.png'
import { MARKER_IMAGE_HEIGHT, MARKER_IMAGE_WIDTH, MARKER_IMAGE_X, MARKER_IMAGE_Y } from '@/constants/marker.ts'

export default function useKakaoStaticMap(props: {
  latitude: number | null
  longitude: number | null
  loaded: boolean
}) {
  const mapContainerRef  = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  const markerInstanceRef = useRef<KakaoMarker | null>(null);

  useEffect(() => {
    if (!props.loaded || props.latitude == null || props.longitude == null || !mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const startPosition = new window.kakao.maps.LatLng(props.latitude, props.longitude);

    const mapOption = {
      center: startPosition,
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainerRef.current, mapOption);
    mapInstanceRef.current = map;

    const imageSrc = startMarker;
    const imageSize = new window.kakao.maps.Size(MARKER_IMAGE_WIDTH, MARKER_IMAGE_HEIGHT);
    const imageOption = { offset: new window.kakao.maps.Point(MARKER_IMAGE_X, MARKER_IMAGE_Y), };
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

    markerInstanceRef.current = new window.kakao.maps.Marker({
      position: startPosition,
      image: markerImage,
      map: map,
    });
  }, [props.loaded, props.latitude, props.longitude]);

  useEffect(() => {
    if (!mapInstanceRef.current || !markerInstanceRef.current || props.latitude == null || props.longitude == null) return;

    const newPosition = new window.kakao.maps.LatLng(props.latitude, props.longitude);

    mapInstanceRef.current?.panTo(newPosition);
    markerInstanceRef.current?.setPosition(newPosition);
  }, [props.latitude, props.longitude]);

  return {
    mapContainerRef
  };
}
