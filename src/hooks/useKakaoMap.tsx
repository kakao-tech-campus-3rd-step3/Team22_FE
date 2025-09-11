import { useEffect, useRef, useState } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { LocationDotIcon } from '@/assets/icons/LocationDotIcon.tsx'

interface CenterLocationState {
  latitude: number
  longitude: number
}

export default function useKakaoMap(props: {
  mapRef: React.RefObject<HTMLDivElement>
  location: { latitude: number; longitude: number }
  loaded: boolean
}) {
  const mapInstanceRef = useRef<KakaoMap | null>(null);
  const overlayRef = useRef<KakaoCustomOverlay | null>(null);
  const overlayRootRef = useRef<Root | null>(null);
  const [address, setAddress] = useState<string>('위치를 찾는 중...');
  const [place, setPlace] = useState<string>('장소를 찾는 중...');
  const [centerLocation, setCenterLocation] = useState<CenterLocationState>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (!props.loaded || !props.location || !props.mapRef.current) { return; }
    if (mapInstanceRef.current) return;

    const currentPosition = new window.kakao.maps.LatLng(
      props.location.latitude,
      props.location.longitude,
    )

    const mapOptions = {
      center: currentPosition,
      level: 1,
    }

    mapInstanceRef.current = new window.kakao.maps.Map(props.mapRef.current, mapOptions)

    const customOverlayContent = document.createElement('div')
    overlayRef.current = new window.kakao.maps.CustomOverlay({
      position: currentPosition,
      content: customOverlayContent,
      xAnchor: 0.5,
      yAnchor: 0.5,
    });
    overlayRef.current?.setMap(mapInstanceRef.current);
    overlayRootRef.current = createRoot(customOverlayContent);
    overlayRootRef.current?.render(<LocationDotIcon />);
  }, [props.mapRef, props.location, props.loaded])

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
            { location: center, radius: 50 },
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
  }, [props.loaded, props.location])

  return { address, place, centerLocation }
}
