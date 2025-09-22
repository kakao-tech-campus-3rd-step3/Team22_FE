import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type PetProfile, defaultPetProfile } from '@/types/petProfile'

interface PetProfileStore {
  petProfile: PetProfile
  updatePetProfile: <K extends keyof PetProfile>(key: K, value: PetProfile[K]) => void
  setPetProfile: (data: Partial<PetProfile>) => void
  resetPetProfile: () => void
}

export const usePetProfileStore = create<PetProfileStore>()(
  persist(
    (set) => ({
      petProfile: defaultPetProfile,
      updatePetProfile: (key, value) =>
        set((state) => ({
          petProfile: {
            ...state.petProfile,
            [key]: value,
          },
        })),
      setPetProfile: (data) =>
        set((state) => ({
          petProfile: {
            ...state.petProfile,
            ...data,
          },
        })),
      resetPetProfile: () => set({ petProfile: defaultPetProfile }),
    }),
    {
      name: 'pet-profile-storage',
    },
  ),
)
