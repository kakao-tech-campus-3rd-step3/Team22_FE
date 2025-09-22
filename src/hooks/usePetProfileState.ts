import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Breed = 'Maltese' | 'Golden Retriever' | 'Poodle'

export interface PetProfileFormState {
  selectedBreed: Breed
  gender: 'male' | 'female'
  neutralize: true | false
  vaccinated: true | false
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
  neutralize: false,
  vaccinated: false,
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

type PetProfileState = {
  petProfile: PetProfileFormState
  updatePetProfile: <K extends keyof PetProfileFormState>(
    key: K,
    value: PetProfileFormState[K],
  ) => void
}

export const usePetProfileState = create<PetProfileState>()(
  persist(
    (set) => ({
      petProfile: initialPetProfileState,
      updatePetProfile: (key, value) =>
        set((state) => ({
          petProfile: {
            ...state.petProfile,
            [key]: value,
          },
        })),
    }),
    {
      name: 'pet-profile-storage',
    },
  ),
)
