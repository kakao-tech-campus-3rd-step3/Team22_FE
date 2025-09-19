import { useEffect, useState } from 'react'

type LocationStatus = 'loading' | 'success' | 'denied' | 'error'

interface LocationTypes {
  location: {
    latitude: number
    longitude: number
  }
  status: LocationStatus
}

export default function useLocation() {
  const [location, setLocation] = useState<LocationTypes>({
    location: { latitude: 37.483034, longitude: 126.902435 },
    status: 'loading',
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        location: { latitude: 37.483034, longitude: 126.902435 },
        status: 'error',
      })
      return
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        status: 'success',
      });
    }

    const error = (err: GeolocationPositionError) => {
      console.warn('현재 위치 찾기 실패', err);

      if (err.code === 1) {
        setLocation({
          location: { latitude: 37.483034, longitude: 126.902435 },
          status: 'denied',
        })
      } else {
        setLocation({
          location: { latitude: 37.483034, longitude: 126.902435 },
          status: 'error',
        })
      }
    }

    const watcherId = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    })

    return () => {
      navigator.geolocation.clearWatch(watcherId)
    }
  }, [])

  return location
}
