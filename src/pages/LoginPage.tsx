import React, { useEffect, useState } from 'react'
import { FiUser, FiLock } from 'react-icons/fi'
import { FaDog } from 'react-icons/fa'
import { useUIStore } from '@/stores/uiStore'
import { Toaster } from 'react-hot-toast'
import { useLogin, useRegister } from '@/hooks/useLogin'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isRegister, setIsRegister] = useState(false)

  const setShowNavbar = useUIStore((state) => state.setShowNavbar)

  const loginMutation = useLogin()
  const registerMutation = useRegister()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isRegister) {
      registerMutation.mutate({ email, username, password })
    } else {
      loginMutation.mutate({ email, password })
    }
  }

  useEffect(() => {
    setShowNavbar(false)
    return () => setShowNavbar(true)
  }, [setShowNavbar])

  const isLoading = isRegister ? registerMutation.isPending : loginMutation.isPending
  const isError = isRegister ? registerMutation.isError : loginMutation.isError
  const error = isRegister ? registerMutation.error : loginMutation.error

  return (
    <>
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit} className="p-6 rounded shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-center">{isRegister ? '회원가입' : '로그인'}</h2>
          <FaDog size={50} className="mt-2" />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
            이메일
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <FiUser className="text-gray-400 m-2" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-2 outline-none rounded"
              placeholder="이메일을 입력하세요"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {isRegister && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
              사용자 이름
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <FiUser className="text-gray-400 m-2" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2 px-2 outline-none rounded"
                placeholder="사용자 이름을 입력하세요"
                required
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
            비밀번호
          </label>
          <div className="flex items-center border border-gray-300 rounded">
            <FiLock className="text-gray-400 m-2" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-2 outline-none rounded"
              placeholder="비밀번호를 입력하세요"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading
            ? isRegister
              ? '회원가입 중...'
              : '로그인 중...'
            : isRegister
              ? '회원가입'
              : '로그인'}
        </button>
        {isError && <p className="text-red-500 mt-2">{(error as Error).message}</p>}
        <p className="mt-4 text-center text-sm text-gray-600">
          {isRegister ? '계정이 이미 있으신가요?' : '계정이 없으신가요?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-600 hover:underline"
          >
            {isRegister ? '로그인' : '회원가입'}
          </button>
        </p>
      </form>
    </>
  )
}

export default LoginPage
