import IntroPage from '@/pages/IntroPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/intro')({
  component: IntroPage,
})
