import React, { useEffect, useState } from 'react'
import { FiUser, FiLock } from 'react-icons/fi'
import { useUIStore } from '@/stores/uiStore'
import { Toaster } from 'react-hot-toast'
import { useLogin, useRegister } from '@/hooks/useLogin'
import { motion } from 'framer-motion'

function LoginFormComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isRegister, setIsRegister] = useState(false)

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

  const isLoading = isRegister ? registerMutation.isPending : loginMutation.isPending
  const isError = isRegister ? registerMutation.isError : loginMutation.isError
  const error = isRegister ? registerMutation.error : loginMutation.error

  return (
    <>
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow-md w-full max-w-sm bg-neutral-900 text-white"
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold text-center">{isRegister ? '회원가입' : '로그인'}</h2>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 text-sm font-semibold mb-2">
            이메일
          </label>
          <div className="flex items-center border border-gray-700 rounded bg-neutral-800">
            <FiUser className="text-gray-400 m-2" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 px-2 outline-none rounded bg-neutral-800 text-white"
              placeholder="이메일을 입력하세요"
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {isRegister && (
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 text-sm font-semibold mb-2">
              사용자 이름
            </label>
            <div className="flex items-center border border-gray-700 rounded bg-neutral-800">
              <FiUser className="text-gray-400 m-2" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2 px-2 outline-none rounded bg-neutral-800 text-white"
                placeholder="사용자 이름을 입력하세요"
                required
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 text-sm font-semibold mb-2">
            비밀번호
          </label>
          <div className="flex items-center border border-gray-700 rounded bg-neutral-800">
            <FiLock className="text-gray-400 m-2" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 px-2 outline-none rounded bg-neutral-800 text-white"
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
        <p className="mt-4 text-center text-sm text-gray-400">
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

export default function LoginPage() {
  const [showForm, setShowForm] = useState(false)
  const setShowNavbar = useUIStore((state) => state.setShowNavbar)

  useEffect(() => {
    setShowNavbar(false)
  }, [setShowNavbar])

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center mb-6 bg-neutral-900 w-full"
      >
        <motion.img
          src="/assets/pet-walk.png"
          alt="pet walk"
          className="w-32 h-32 object-contain"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
        <motion.div
          className="text-3xl font-bold text-white flex flex-col items-center justify-center w-full p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span className="text-md">펫위워크</span>
          <p className="text-sm">반려견을 위한 최적 산책경로 판단서비스</p>
        </motion.div>
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full max-w-sm"
        >
          <LoginFormComponent />
        </motion.div>
      )}
    </div>
  )
}
