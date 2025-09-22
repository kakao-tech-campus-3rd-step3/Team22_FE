import { getDistance, getPathLength } from 'geolib'
import { useEffect, useState } from 'react'

type ValidRoutePoint = { lat: number; lng: number };

export default function useDistance(props: {
  currentLocation?: { latitude: number; longitude: number }
  latitude?: number | null
  longitude?: number | null
  route?: { lat: number | null; lng: number | null }[]
}) {
  const [totalDistance, setTotalDistance] = useState(0)
  const [startDistance, setStartDistance] = useState(0)

  useEffect(() => {
    if (props.route && props.route.length > 0) {
      const validRoute = props.route.filter(
        (p): p is ValidRoutePoint => p.lat !== null && p.lng !== null);

      if (validRoute.length > 0) { setTotalDistance(getPathLength(validRoute)); }
      return;
    }
  }, [props.route])

  useEffect(() => {
    if (
      props.currentLocation?.latitude != null &&
      props.currentLocation?.longitude != null &&
      props.latitude != null &&
      props.longitude != null
    ) {
      const distance = getDistance(
        { latitude: props.latitude, longitude: props.longitude },
        { latitude: props.currentLocation.latitude, longitude: props.currentLocation.longitude },
      )
      setStartDistance(distance)
      return
    }
  }, [props.currentLocation, props.latitude, props.longitude])

  return { totalDistance, setTotalDistance, startDistance }
}
