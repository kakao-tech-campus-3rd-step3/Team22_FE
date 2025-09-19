import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <a href="/add-new-pet">펫정보테스트</a> | <a href="/location-setting">지도테스트</a> |
        <a href="/walk-time-setting">시간 설정</a> | <a href="/map-setup">설정 완료</a>
      </nav>
      <hr />
      <Outlet />
    </>
  ),
})
