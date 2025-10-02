import axios from 'axios'
import { Login403Error, Register409Error } from '@/constants/Erros'

const apiClient = axios.create({
  baseURL: 'https://spring-gift.store/api',
  headers: { 'Content-Type': 'application/json' },
})

export async function loginApi(data: { email: string; password: string }): Promise<string> {
  try {
    const response = await apiClient.post('/login', data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 403) {
        const errData = error.response.data
        throw new Login403Error(errData.code, '이메일 또는 비밀번호가 일치하지 않습니다.')
      }
    }
    throw error
  }
}

export async function registerApi(data: {
  email: string
  username: string
  password: string
}): Promise<string> {
  try {
    const response = await apiClient.post('/register', data)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 409) {
        const errData = error.response.data
        throw new Register409Error(errData.code, '중복된 이메일입니다.')
      }
    }
    throw error
  }
}
