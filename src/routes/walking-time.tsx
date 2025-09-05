import { createFileRoute } from '@tanstack/react-router'
import WalkingTimeSetting from '@/pages/WalkingTimeSetting';

export const Route = createFileRoute('/walking-time')({
  component: WalkingTimeSetting,
})
