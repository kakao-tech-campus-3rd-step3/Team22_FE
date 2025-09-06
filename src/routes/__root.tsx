import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootComponent = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      {/* Root는 위치 기준점 역할을 하도록 relative */}
      <div className="relative w-[390px] h-[844px] bg-black shadow-lg rounded-xl overflow-hidden">
        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
