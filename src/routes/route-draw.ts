import { createFileRoute } from '@tanstack/react-router'
import RouteDrawPage from '@/pages/RouteDrawPage.tsx'

export const Route = createFileRoute('/route-draw')({
  component: RouteDrawPage,
})
