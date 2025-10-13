import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type PetProfileFormState } from '@/hooks/usePetProfileState'
import { petProfileDefaultsForForm } from '@/constants/petProfileDefault'

interface PetProfileStore {
  petProfile: PetProfileFormState
  updatePetProfile: <K extends keyof PetProfileFormState>(
    key: K,
    value: PetProfileFormState[K],
  ) => void
  setPetProfile: (data: Partial<PetProfileFormState>) => void
  resetPetProfile: () => void
}

export const usePetProfileStore = create<PetProfileStore>()(
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
      setPetProfile: (data) =>
        set((state) => ({
          petProfile: {
            ...state.petProfile,
            ...data,
          },
        })),
      resetPetProfile: () => set({ petProfile: petProfileDefaultsForForm }),
    }),
    {
      name: 'pet-profile-storage',
    },
  ),
)
