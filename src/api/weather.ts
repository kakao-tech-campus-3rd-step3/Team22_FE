import { api } from '@/api/api.ts'

export const getWeather = (latitude: number, longitude: number) => {
  return api.get(`/weather?lat=${latitude}&lon=${longitude}&cnt=10`)
}
