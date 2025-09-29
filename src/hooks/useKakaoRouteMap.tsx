import { useEffect, useRef } from 'react'
import startMarker from '@/assets/icons/StartMarker.png'
import currentDotIcon from '@/assets/icons/CurrentDotIcon.svg'
import { MARKER_IMAGE_HEIGHT, MARKER_IMAGE_WIDTH, MARKER_IMAGE_X, MARKER_IMAGE_Y } from '@/constants/marker.ts'

export default function useKakaoRouteMap(props: {
  latitude: number | null
  longitude: number | null
  loaded: boolean
  currentLocation: { latitude: number; longitude: number }
  route: { lat: number | null; lng: number | null }[]
}) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<KakaoMap | null>(null)
  const markerInstanceRef = useRef<KakaoMarker | null>(null)
  const polylineRef = useRef<KakaoPolyline | null>(null)
  const currentLocationMarkerRef = useRef<KakaoMarker | null>(null)

  useEffect(() => {
    if (!loaded || latitude == null || longitude == null || !mapContainerRef.current) return
    if (mapInstanceRef.current) return

    const startPosition = new window.kakao.maps.LatLng(latitude, longitude)

    const mapOption = {
      center: startPosition,
      level: 3,
    }

    const map = new window.kakao.maps.Map(mapContainerRef.current, mapOption)
    mapInstanceRef.current = map

    const imageSrc = startMarker
    const imageSize = new window.kakao.maps.Size(MARKER_IMAGE_WIDTH, MARKER_IMAGE_HEIGHT)
    const imageOption = { offset: new window.kakao.maps.Point(MARKER_IMAGE_X, MARKER_IMAGE_Y) }
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    markerInstanceRef.current = new window.kakao.maps.Marker({
      position: startPosition,
      image: markerImage,
      map: map,
    })
  }, [loaded, latitude, longitude])

  useEffect(() => {
    if (
      !mapInstanceRef.current ||
      !markerInstanceRef.current ||
      latitude == null ||
      longitude == null
    )
      return

    const newPosition = new window.kakao.maps.LatLng(latitude, longitude)

    mapInstanceRef.current?.panTo(newPosition)
    markerInstanceRef.current?.setPosition(newPosition)
  }, [latitude, longitude])

  useEffect(() => {
    if (!mapInstanceRef.current || route.length === 0) return

    const linePath = route.map((p) => new window.kakao.maps.LatLng(p.lat!, p.lng!))

    if (!polylineRef.current) {
      polylineRef.current = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: 5,
        strokeColor: '#FFAE00',
        strokeOpacity: 0.7,
        strokeStyle: 'solid',
      })
      polylineRef.current?.setMap(mapInstanceRef.current)
    } else {
      polylineRef.current?.setPath(linePath)
    }
  }, [route])


  useEffect(() => {
    if (!mapInstanceRef.current || !props.currentLocation.latitude || !props.currentLocation.longitude) return

    const currentPosition = new window.kakao.maps.LatLng(
      currentLocation.latitude,
      currentLocation.longitude,
    )


    if (!currentLocationMarkerRef.current) {
      const imageSize = new window.kakao.maps.Size(48, 48); // 예: 너비 48, 높이 48
      const imageOption = { offset: new window.kakao.maps.Point(24, 24) }; // 이미지의 중심을 마커 좌표에 맞춤

      const markerImage = new window.kakao.maps.MarkerImage(
        currentDotIcon,
        imageSize,
        imageOption
      );

      currentLocationMarkerRef.current = new window.kakao.maps.Marker({
        position: currentPosition,
        image: markerImage,
        map: mapInstanceRef.current,
      });
    } else {
      currentLocationMarkerRef?.current?.setPosition(currentPosition);
    }

    overlayRef.current?.setMap(mapInstanceRef.current)
    overlayRootRef.current = createRoot(content)
    overlayRootRef.current?.render(<LocationDotIcon />)
  }, [currentLocation])


  return { mapContainerRef }
}
