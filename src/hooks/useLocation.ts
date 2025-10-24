import { useEffect, useState } from 'react'
import { MAXIMUM_AGE, TIME_OUT } from '@/constants/location.ts'

export type LocationStatus = 'loading' | 'success' | 'denied' | 'error'

interface UseLocationState {
  initialLocation: { latitude: number; longitude: number } | null;
  updatedLocation: { latitude: number; longitude: number } | null;
  status: LocationStatus;
}

const DEFAULT_LOCATION = { latitude: 37.5665, longitude: 126.9780 };

export default function useLocation() {
  const [state, setState] = useState<UseLocationState>({
    initialLocation: null,
    updatedLocation: null,
    status: 'loading',
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        initialLocation: DEFAULT_LOCATION,
        updatedLocation: DEFAULT_LOCATION,
        status: 'error',
      })
      return
    }

    const handleInitialSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setState({
        initialLocation: { latitude, longitude },
        updatedLocation: { latitude, longitude },
        status: 'success',
      });
    };

    const handleError = (err: GeolocationPositionError) => {
      console.warn('위치 가져오기 실패', err);
      setState({
        initialLocation: DEFAULT_LOCATION,
        updatedLocation: DEFAULT_LOCATION,
        status: err.code === 1 ? 'denied' : 'error',
      });
    };

    navigator.geolocation.getCurrentPosition(handleInitialSuccess, handleError, {
      enableHighAccuracy: true,
      timeout: TIME_OUT,
      maximumAge: MAXIMUM_AGE,
    });

    const handleWatchSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setState(prevState => ({
        ...prevState,
        updatedLocation: { latitude, longitude },
      }));
    };

    const watcherId = navigator.geolocation.watchPosition(handleWatchSuccess, (err) => {
      console.warn('실시간 위치 감시 에러', err);
    }, {
      enableHighAccuracy: true,
    });

    return () => {
      navigator.geolocation.clearWatch(watcherId)
    }
  }, [])

  return state
}
