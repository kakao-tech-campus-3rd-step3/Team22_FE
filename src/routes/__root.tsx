import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootComponent = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-[390px] h-[844px] bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>

      <TanStackRouterDevtools />
    </div>
  )
}

export const Route = createRootRoute({
  component: RootComponent,
})
