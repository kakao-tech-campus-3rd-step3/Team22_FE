import { useEffect, useRef } from 'react'
import startMarker from '@/assets/icons/StartMarker.png'
import { MARKER_IMAGE_HEIGHT, MARKER_IMAGE_WIDTH, MARKER_IMAGE_X, MARKER_IMAGE_Y } from '@/constants/marker.ts'
import type { Root } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { LocationDotIcon } from '@/assets/icons/LocationDotIcon.tsx'

export default function useKakaoRouteMap(props: {
  latitude: number | null
  longitude: number | null
  loaded: boolean
  currentLocation: { latitude: number | null, longitude: number | null }
  route: { lat: number | null, lng: number | null }[]
}) {
  const mapContainerRef  = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  const markerInstanceRef = useRef<KakaoMarker | null>(null);
  const polylineRef = useRef<KakaoPolyline | null>(null);
  const overlayRef = useRef<KakaoCustomOverlay | null>(null);
  const overlayRootRef = useRef<Root | null>(null);

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
    const imageOption = { offset: new window.kakao.maps.Point(MARKER_IMAGE_X, MARKER_IMAGE_Y) };
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

  useEffect(() => {
    if (!mapInstanceRef.current || props.route.length === 0) return;

    const linePath = props.route.map((p) => new window.kakao.maps.LatLng(p.lat!, p.lng!));

    if (!polylineRef.current) {
      polylineRef.current = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#FFAE00',
        strokeOpacity: 0.7,
        strokeStyle: 'solid'
      });
      polylineRef.current?.setMap(mapInstanceRef.current);
    } else {
      polylineRef.current?.setPath(linePath);
    }
  }, [props.route]);

  useEffect(() => {
    if (overlayRef.current) overlayRef.current?.setMap(null);

    const currentPosition = new window.kakao.maps.LatLng(
      props.currentLocation.latitude,
      props.currentLocation.longitude,
    )

      const content = document.createElement('div');
      overlayRef.current = new window.kakao.maps.CustomOverlay({
        position: currentPosition,
        content: content,
        xAnchor: 0.5,
        yAnchor: 0.5,
      });

      overlayRef.current?.setMap(mapInstanceRef.current);
      overlayRootRef.current = createRoot(content);
      overlayRootRef.current?.render(<LocationDotIcon />);

  }, [props.currentLocation])

  return {
    mapContainerRef
  };
}
