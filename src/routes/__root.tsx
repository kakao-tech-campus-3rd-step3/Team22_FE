import Navbar from '@/components/common/NavBar'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <a href="/add-new-pet">펫정보테스트</a> | <a href="/location-setting">지도테스트</a> |
        <a href="/walk-time-setting">시간 설정</a> | <a href="/map-setup">설정 완료</a>
      </nav>
      <hr />
      <div className="flex justify-center items-center min-h-screen bg-neutral-800 font-sans">
        <div className="flex flex-col items-center w-[390px] h-[844px] bg-[#121212] text-white shadow-2xl rounded-3xl overflow-y-auto p-6 space-y-6">
          <Outlet />
          <Navbar />
        </div>
      </div>
    </>
  ),
})
