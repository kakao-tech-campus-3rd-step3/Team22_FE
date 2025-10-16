import { api } from '@/api/api.ts'

const WEATHER_COUNT = 20;

export const getWeather = (latitude: number, longitude: number) => {
  return api.get(`/weather?lat=${latitude}&lon=${longitude}&cnt=${WEATHER_COUNT}`)
}
