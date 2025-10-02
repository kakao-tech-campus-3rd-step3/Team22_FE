import useAuthStore from '@/stores/authStore'
import { useNavigate } from '@tanstack/react-router'

function MyPage() {
  const email = useAuthStore((state) => state.email)
  const username = useAuthStore((state) => state.username)
  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">내 정보</h1>
      <div className="mb-6">
        <p className="mb-2 text-gray-700">
          <strong>이름:</strong> {username || '로그인 정보가 없습니다'}
        </p>
        <p className="text-gray-700">
          <strong>이메일:</strong> {email || '로그인 정보가 없습니다'}
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
      >
        로그아웃
      </button>
    </div>
  )
}

export default MyPage
