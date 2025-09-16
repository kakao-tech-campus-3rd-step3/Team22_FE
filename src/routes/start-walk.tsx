import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/start-walk')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/start-walk"!</div>
}
