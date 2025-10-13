import { type GenderType } from '@/constants/constants'
import { petProfileDefaultsForForm } from '@/constants/petProfileDefault'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Breed = 'Maltese' | 'Golden Retriever' | 'Poodle'

export interface PetProfileFormState {
  name: string
  selectedBreed: Breed
  gender: GenderType
  neutralize: true | false
  vaccinated: true | false
  birthdate: string
  personality: 'extroverted' | 'introverted'
  preferredWeather: string[]
  preferredPaths: string[]
  chronicDisease: string[]
  weight: string
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
      petProfile: petProfileDefaultsForForm,
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
