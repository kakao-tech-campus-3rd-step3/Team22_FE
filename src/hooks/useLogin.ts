import { useMutation } from '@tanstack/react-query'
import { loginApi, registerApi } from '@/api/auth'
import useAuthStore from '@/stores/authStore'
import { toast } from 'react-hot-toast'
import { useNavigate } from '@tanstack/react-router'

export function useLogin() {
  const login = useAuthStore((state) => state.login)
  const username = useAuthStore((state) => state.username)
  const navigate = useNavigate()

  const mutation = useMutation<string, Error, { email: string; password: string }>({
    mutationFn: loginApi,
    onSuccess: (token: string, variables) => {
      login(token, username ?? variables.email.split('@')[0], variables.email)
      navigate({ to: '/intro' })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return mutation
}

export function useRegister() {
  const setUsername = useAuthStore((state) => state.setUsername)
  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (_, variables) => {
      toast.success('회원가입 완료! 로그인 해주세요.')
      setUsername(variables.username)
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return mutation
}
