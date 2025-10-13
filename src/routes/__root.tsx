import Navbar from '@/components/common/NavBar'
import { useUIStore } from '@/stores/uiStore'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export function RootLayout() {
  const showNavbar = useUIStore((state) => state.showNavbar)

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-neutral-800 font-sans">
        <div className="flex flex-col items-center w-[390px] h-[844px] bg-[#121212] text-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="flex-1 w-full px-6 pt-6 py-6 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <Outlet />
          </div>
          {showNavbar && (
            <div className="w-full">
              <Navbar />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
