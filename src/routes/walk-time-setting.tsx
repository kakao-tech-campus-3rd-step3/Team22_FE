import { createFileRoute } from '@tanstack/react-router'
import WalkingTimeSettingPage from '@/pages/WalkingTimeSettingPage'

export const Route = createFileRoute('/walk-time-setting')({
  component: WalkingTimeSettingPage,
})
