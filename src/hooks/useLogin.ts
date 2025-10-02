import { useMutation } from '@tanstack/react-query'
import { loginApi, registerApi } from '@/api/auth'
import useAuthStore from '@/stores/authStore'
import { toast } from 'react-hot-toast'
import { useNavigate } from '@tanstack/react-router'

export function useLogin() {
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const mutation = useMutation<string, Error, { email: string; password: string }>({
    mutationFn: loginApi,
    onSuccess: (token: string, variables) => {
      const username = variables.email.split('@')[0]
      login(token, username, variables.email)
      navigate({ to: '/' })
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return mutation
}

export function useRegister() {
  const mutation = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      toast.success('회원가입 완료! 로그인 해주세요.')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  return mutation
}
