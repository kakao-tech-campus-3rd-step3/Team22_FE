import { useEffect, useRef, useState } from 'react'
import currentDotIcon from '@/assets/icons/CurrentDotIcon.svg'

interface CenterLocationState {
  latitude: number
  longitude: number
}

export default function useKakaoMap(props: {
  mapRef: React.RefObject<HTMLDivElement>
  updatedLocation: { latitude: number; longitude: number } | null
  loaded: boolean
}) {
  const mapInstanceRef = useRef<KakaoMap | null>(null)
  const currentLocationMarkerRef = useRef<KakaoMarker | null>(null)
  const [address, setAddress] = useState<string>('위치를 찾는 중...')
  const [place, setPlace] = useState<string>('장소를 찾는 중...')
  const [centerLocation, setCenterLocation] = useState<CenterLocationState>({
    latitude: 0,
    longitude: 0,
  })
  const { mapRef, updatedLocation, loaded } = props

  useEffect(() => {
    if (!loaded || !updatedLocation || !mapRef.current) {
      return
    }
    if (mapInstanceRef.current) return

    const currentPosition = new window.kakao.maps.LatLng(updatedLocation.latitude, updatedLocation.longitude)

    const mapOptions = {
      center: currentPosition,
      level: 1,
    }

    mapInstanceRef.current = new window.kakao.maps.Map(mapRef.current, mapOptions)
    if (!currentLocationMarkerRef.current) {
      const imageSize = new window.kakao.maps.Size(48, 48); 
      const imageOption = { offset: new window.kakao.maps.Point(24, 24) }; 

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
  }, [loaded, updatedLocation, mapRef])

  useEffect(() => {
    const map = mapInstanceRef.current
    if (!map) return

    const geocoder = new window.kakao.maps.services.Geocoder()
    const places = new window.kakao.maps.services.Places()

    const fetchLocationInfo = () => {
      const center = map.getCenter()

      setCenterLocation({ latitude: center.getLat(), longitude: center.getLng() })

      geocoder.coord2Address(center.getLng(), center.getLat(), (result, status) => {
        if (status === window.kakao.maps.services.Status.OK && result[0]) {
          const addr =
            result[0].road_address?.address_name ?? result[0].address?.address_name ?? '주소 없음'
          setAddress(addr)

          places.keywordSearch(
            addr,
            (placeResult, placeStatus) => {
              if (placeStatus === window.kakao.maps.services.Status.OK && placeResult[0]) {
                setPlace(placeResult[0].place_name)
              } else {
                const addressParts = addr.split(' ')
                setPlace(addressParts[addressParts.length - 1])
              }
            },
            { updatedLocation: center, radius: 50 },
          )
        } else {
          setAddress('주소를 찾을 수 없습니다.')
          setPlace('알 수 없는 장소')
        }
      })
    }

    fetchLocationInfo()
    window.kakao.maps.event.addListener(map, 'idle', fetchLocationInfo)

    return () => {
      window.kakao.maps.event.removeListener(map, 'idle', fetchLocationInfo)
    }
  }, [loaded, updatedLocation])

  return { address, place, centerLocation }
}
