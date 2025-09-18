import Navbar from '@/components/common/NavBar'
import { useUIStore } from '@/stores/uiStore'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export function RootLayout() {
  const showNavbar = useUIStore((state) => state.showNavbar)

  return (
    <>
      <nav>
        <a href="/add-new-pet">펫정보테스트</a> | <a href="/location-setting">지도테스트</a> |
        <a href="/walk-time-setting">시간 설정</a> | <a href="/map-setup">설정 완료</a>
      </nav>
      <hr />
      <div className="flex justify-center items-center min-h-screen bg-neutral-800 font-sans">
        <div className="flex flex-col items-center w-[390px] h-[844px] bg-[#121212] text-white shadow-2xl rounded-3xl overflow-hidden">
          <div className="flex-1 w-full px-6 pt-6 overflow-y-auto">
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
