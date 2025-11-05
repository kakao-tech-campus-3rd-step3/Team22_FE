import { getDistance, getPathLength } from 'geolib'
import { useEffect, useState } from 'react'

type ValidRoutePoint = { lat: number; lng: number }

export default function useDistance(props: {
  route: { lat: number; lng: number }[]
  latitude: number
  currentLocation: { latitude: number; longitude: number } | null
  longitude: number
}) {
  const { currentLocation, latitude, longitude, route } = props

  const [totalDistance, setTotalDistance] = useState(0)
  const [startDistance, setStartDistance] = useState(0)

  useEffect(() => {
    if (route && route.length > 0) {
      const validRoute = route.filter((p): p is ValidRoutePoint => p.lat !== null && p.lng !== null)

      if (validRoute.length > 0) {
        setTotalDistance(getPathLength(validRoute))
      }
    }
  }, [route])

  useEffect(() => {
    if (
      currentLocation?.latitude != null &&
      currentLocation?.longitude != null &&
      latitude != null &&
      longitude != null
    ) {
      const distance = getDistance(
        { latitude: latitude, longitude: longitude },
        { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
      )
      setStartDistance(distance)
    }
  }, [currentLocation, latitude, longitude])

  return { totalDistance, setTotalDistance, startDistance }
}
