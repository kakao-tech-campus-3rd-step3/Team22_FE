import { createFileRoute } from '@tanstack/react-router'
import MapSetupComplete from '@/pages/MapSetupComplete.tsx'

export const Route = createFileRoute('/map-setup')({
  component: MapSetupComplete,
})
