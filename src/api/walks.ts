import { api } from '@/api/api.ts'

export const createPath = (path: {
  totalDistance_m: number
  walkingTime_sec: number
  path: {
    lat: number
    lng: number
  }[]
}) => {
  return api.post("/walks", path)
}
