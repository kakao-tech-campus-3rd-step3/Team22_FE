import { useState } from 'react'

export type Breed = 'Maltese' | 'Golden Retriever' | 'Poodle'

export interface PetProfileFormState {
  selectedBreed: Breed
  gender: 'male' | 'female'
  neutralize: 'yes' | 'no'
  vaccinated: 'yes' | 'no'
  birthYear: string
  birthMonth: string
  birthDay: string
  personality: 'extroverted' | 'introverted'
  dayWeather: string[]
  nightWeather: string[]
  preferredPaths: string[]
  selectedDiseases: string[]
  weight: string
}

const initialPetProfileState: PetProfileFormState = {
  selectedBreed: 'Maltese',
  gender: 'male',
  neutralize: 'no',
  vaccinated: 'no',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  personality: 'extroverted',
  dayWeather: [],
  nightWeather: [],
  preferredPaths: [],
  selectedDiseases: [],
  weight: '20',
}

export function usePetProfileState() {
  const [petProfile, setPetProfile] = useState<PetProfileFormState>(initialPetProfileState)

  const updatePetProfile = <K extends keyof PetProfileFormState>(
    key: K,
    value: PetProfileFormState[K],
  ) => {
    setPetProfile((prev) => ({ ...prev, [key]: value }))
  }

  return { petProfile, updatePetProfile }
}
