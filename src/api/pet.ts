import { api } from './api'

export interface PetRegistrationRequest {
  name: string
  breed: string
  gender: 'MALE' | 'FEMALE'
  birthDate: string
  neutralize: boolean
  vaccinated: boolean
  weight: number
  preferredWeather: string
  chronicDisease: string
  preferredPath: string
}

export interface PetRegistrationResponse {
  id?: number
  message?: string
  status?: string
}

export const registerPet = async (
  petData: PetRegistrationRequest,
): Promise<PetRegistrationResponse> => {
  try {
    const { data } = await api.post<PetRegistrationResponse>('/members/pet', petData)
    return data
  } catch (error) {
    throw error
  }
}
