import { api } from '@/api/api.ts'
import axios from 'axios'
import { Auth401Error, Server500Error, Walks400Error } from '@/constants/Erros.ts'

export async function createPath(path: {
  totalDistance_m: number
  walkingTime_sec: number
  path: {
    lat: number
    lng: number
  }[]
}): Promise<number> {
  try {
    const response = await api.post("/walks", path)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const errData = error.response.data

      switch (error.response.status) {
        case 400:
          throw new Walks400Error(errData.code, '잘못된 경로 데이터입니다. 입력값을 확인해주세요.')
        case 401:
          throw new Auth401Error(errData.code, '로그인이 필요합니다. 다시 로그인해주세요.')
        case 500:
          throw new Server500Error(errData.code, '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
        default:
          throw new Error('알 수 없는 에러가 발생했습니다.')
      }
    }
    throw error
  }
}
