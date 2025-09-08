import { createFileRoute } from '@tanstack/react-router'
import MapSetupCompletePage from '@/pages/MapSetupCompletePage'

export const Route = createFileRoute('/map-setup')({
  component: MapSetupCompletePage,
})
