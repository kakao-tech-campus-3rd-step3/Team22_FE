import useAuthStore from '@/stores/authStore'
import { useNavigate } from '@tanstack/react-router'
// import { useMapSetupStore } from '@/hooks/useMapSetupStore'

function MyPage() {
  const email = useAuthStore((state) => state.email)
  const username = useAuthStore((state) => state.username)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()
  // const { walkTimes, totalDistance, walkDates } = useMapSetupStore() // 필요한 정보들이 있다고 가정
  const walkTimes = 10
  const totalDistance = 20
  const walkDates = 30
  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  const handleGoMain = () => {
    navigate({ to: '/location-setting' })
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-neutral-900 rounded-lg text-white shadow-lg space-y-6">
      <h1 className="text-3xl font-semibold mb-4 border-b border-neutral-700 pb-2">내 정보</h1>

      <div className="bg-neutral-800 rounded-md p-4 space-y-3">
        <p>
          <strong>이름:</strong> {username || '로그인 정보가 없습니다'}
        </p>
        <p>
          <strong>이메일:</strong> {email || '로그인 정보가 없습니다'}
        </p>
      </div>

      <div className="bg-neutral-800 rounded-md p-4 space-y-3">
        <p>
          <strong>총 걸은 시간:</strong> {walkTimes ? walkTimes + '시간' : '정보 없음'}
        </p>
        <p>
          <strong>총 걸은 거리:</strong>
          {totalDistance ? totalDistance + '시간' : '정보 없음'}
        </p>
        <p>
          <strong>반려견과 함께한 일자:</strong> {walkDates ? walkDates + ' 일' : '정보 없음'}
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleGoMain}
          className="flex-1 bg-neutral-800 hover:bg-neutral-700 transition rounded py-2 font-medium"
        >
          주 경로 확인
        </button>
        <button
          onClick={handleLogout}
          className="flex-1 bg-red-600 hover:bg-red-700 transition rounded py-2 font-medium"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default MyPage
