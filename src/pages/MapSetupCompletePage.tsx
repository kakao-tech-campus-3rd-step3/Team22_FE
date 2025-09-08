import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'

export default function MapSetupComplete() {
  const { walkTimes, address, place, latitude, longitude } = useMapSetupStore()

  console.log(walkTimes)
  console.log(address)
  console.log(place)
  console.log(latitude)
  console.log(longitude)

  return <div>맵 세팅 페이지</div>
}
