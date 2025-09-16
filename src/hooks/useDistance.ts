import { getPathLength } from 'geolib'
import { useEffect, useState } from 'react'

export default function useDistance(props: {
  route: { lat: number | null, lng: number | null }[]
}) {
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    const validRoute = props.route.filter(
      (p) => p.lat !== null && p.lng !== null) as { lat: number; lng: number }[];

    setTotalDistance(getPathLength(validRoute));
  }, [props.route]);

  return { totalDistance, setTotalDistance };
}
