import React, { useEffect, useState } from 'react'
import { FiUser, FiLock } from 'react-icons/fi'
import { useNavigate } from '@tanstack/react-router'
import useAuthStore from '@/stores/authStore'
import { FaDog } from 'react-icons/fa'
import { useUIStore } from '@/stores/uiStore'

interface LoginProps {
  redirectTo?: string
}

function Login({ redirectTo = '/' }: LoginProps) {
  const [username, setUsernameLocal] = useState('')
  const [password, setPassword] = useState('')

  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const fakeToken = 'example_access_token_' + username

    login(fakeToken, username.split('@')[0])
    navigate({ to: redirectTo })
  }
  const setShowNavbar = useUIStore((state) => state.setShowNavbar)

  useEffect(() => {
    setShowNavbar(false)

    return () => {
      setShowNavbar(true)
    }
  }, [setShowNavbar])

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded shadow-md w-full max-w-sm">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <FaDog size={50} className="mt-2" />
      </div>
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">
          Username
        </label>
        <div className="flex items-center border border-gray-300 rounded">
          <FiUser className="text-gray-400 m-2" />
          <input
            id="username"
            type="email"
            value={username}
            onChange={(e) => setUsernameLocal(e.target.value)}
            className="w-full py-2 px-2 outline-none rounded"
            placeholder="Enter your e-mail"
            required
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
          Password
        </label>
        <div className="flex items-center border border-gray-300 rounded">
          <FiLock className="text-gray-400 m-2" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full py-2 px-2 outline-none rounded"
            placeholder="Enter your password"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Log In
      </button>
    </form>
  )
}

export default Login
