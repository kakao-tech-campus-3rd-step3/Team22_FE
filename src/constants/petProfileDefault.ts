import type { PetProfileFormState } from '@/hooks/usePetProfileState'

export const petProfileDefaultsForForm: PetProfileFormState = {
  selectedBreed: 'Maltese',
  gender: 'MALE',
  neutralize: false,
  vaccinated: false,
  birthdate: '',
  personality: 'extroverted',
  preferredWeather: [],
  preferredPaths: [],
  chronicDisease: [],
  weight: '3',
}
