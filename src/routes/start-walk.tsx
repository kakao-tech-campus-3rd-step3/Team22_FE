import { createFileRoute } from '@tanstack/react-router'
import LocationSettingPage from '@/pages/LocationSettingPage'

export const Route = createFileRoute('/start-walk')({
  component: LocationSettingPage,
})
