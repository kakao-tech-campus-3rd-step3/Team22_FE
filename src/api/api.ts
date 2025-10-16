import axios from 'axios'
import {
  Login403Error,
  Register409Error,
  SessionExpired403Error,
  Server500Error,
  MainRouteNotFound404Error,
} from '@/constants/Erros'
import Sentry from '@/libs/sentry.ts'

export const api = axios.create({
  baseURL: 'https://spring-gift.store/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config
  const stored = window.localStorage.getItem('auth-storage')
  if (stored) {
    try {
      const parsed = JSON.parse(stored)
      const token = parsed.state?.accessToken?.accessToken || ''
      if (token) config.headers.Authorization = `Bearer ${token}`
    } catch (e) {
      console.error('auth-storgae 파싱 에러: ', e)
      Sentry.captureException(e)
    }
  }
  return config
})

api.interceptors.response.use(
  (r) => r,
  (error) => {
    const { response } = error
    if (!response) {
      console.error('Axios 에러 (네트워크 등): ', error)
      Sentry.captureException(error)
      throw error
    }

    const { status, data } = response
    const code = data?.code || data?.status || ''
    const message = data?.message || data?.error || 'Unknown error'

    console.error(`API Error [${status} - ${code}]: ${message}`, data)
    Sentry.captureException(error, {
      extra: { status, code, message, data }
    })

    if (status === 403) {
      if (code === 'SESSION_EXPIRED') throw new SessionExpired403Error(code, message)
      throw new Login403Error(code, '이메일 혹은 비밀번호가 일치하지 않습니다.')
    }

    if (status === 404) {
      if (code === 'NOT_FOUND') throw new MainRouteNotFound404Error(code, message)
      throw error
    }

    if (status === 409) throw new Register409Error(code, '이미 가입되었습니다.')
    if (status === 500) throw new Server500Error(code, message)
    throw error
  },
)
