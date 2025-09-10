import { useEffect, useRef } from 'react'
import startMarker from '@/assets/icons/startMarker.png'
import {
  MARKER_IMAGE_HEIGHT,
  MARKER_IMAGE_WIDTH,
  MARKER_IMAGE_X,
  MARKER_IMAGE_Y,
} from '@/constants/marker.ts'

export default function useKakaoStaticMap(props: {
  latitude: number | null
  longitude: number | null
  loaded: boolean
}) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!props.loaded || props.latitude == null || props.longitude == null) return

    const startPosition = new window.kakao.maps.LatLng(props.latitude, props.longitude)

    const mapOption = {
      center: startPosition,
      level: 3,
    }

    const map = new window.kakao.maps.Map(mapContainerRef.current, mapOption)

    const markerPosition = startPosition

    const imageSrc = startMarker
    const imageSize = new window.kakao.maps.Size(MARKER_IMAGE_WIDTH, MARKER_IMAGE_HEIGHT)
    const imageOption = { offset: new window.kakao.maps.Point(MARKER_IMAGE_X, MARKER_IMAGE_Y) }

    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    })

    marker.setMap(map)
  }, [props.loaded, props.latitude, props.longitude])

  return {
    mapContainerRef,
  }
}
