import CardBox from '@/components/common/CardBox'
import InfoRow from '@/components/common/InfoRow'
import WeatherTable from '@/components/common/WeatherTable'
import useAuthStore from '@/stores/authStore'
import { useRouter } from '@tanstack/react-router'

export default function MainPage() {
  const username = useAuthStore((state) => state.username)
  const router = useRouter()

  const handleCardClick = () => {
    router.navigate({ to: `/map-setup` })
  }

  return (
    <div className="flex flex-col gap-10">
      <InfoRow label="">
        <div className="flex flex-col bg-neutral-800 rounded-lg shadow-xl p-6 w-full">
          <span>{username}</span>
        </div>
      </InfoRow>
      <WeatherTable />
      <CardBox onClick={handleCardClick} />
    </div>
  )
}
