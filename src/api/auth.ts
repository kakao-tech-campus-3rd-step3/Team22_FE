import { api } from './api'

export async function loginApi(data: { email: string; password: string }): Promise<string> {
  const response = await api.post('/login', data)
  return response.data
}

export async function registerApi(data: { email: string; username: string; password: string }) {
  const response = await api.post('/register', data)
  return response.data
}
