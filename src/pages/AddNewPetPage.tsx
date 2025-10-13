import { useState, useEffect } from 'react'
import ProfileSection from './AddNewPetPageSections/ProfileSection'
import DefaultProfileSection from './AddNewPetPageSections/DefaultCharacterSection'
import DetailCharacterSection from './AddNewPetPageSections/DetailCharacterSection'
import SelectionModal from '@/components/common/SelectionModal'
import { petProfileSchema } from '@/types/petProfile'
import { UI_TEXT, BREED_OPTIONS_DATA, DISEASE_OPTIONS_DATA } from '@/constants/constants.ts'
import { usePetProfileState, type Breed } from '@/hooks/usePetProfileState'
import { useSetupStore } from '@/stores/setupStore'
import { type GenderType } from '@/constants/constants'
import { useNavigate } from '@tanstack/react-router'

function AddNewPetPage(props: { onDone?: () => void; disableRouting?: boolean }) {
  const [isFormValid, setIsFormValid] = useState(false)
  const { petProfile, updatePetProfile } = usePetProfileState()
  const { onDone, disableRouting } = props
  const [isBreedModalOpen, setIsBreedModalOpen] = useState(false)
  const [isDiseaseModalOpen, setIsDiseaseModalOpen] = useState(false)
  const setPetSettingDone = useSetupStore((s) => s.setPetSettingDone)
  const navigate = useNavigate()

  const isExistingProfile =
    petProfile.birthdate.trim() !== '' ||
    petProfile.chronicDisease.length > 0 ||
    petProfile.weight.trim() !== ''

  const handleDiseaseToggle = (disease: string) => {
    const currentDiseases = petProfile.chronicDisease
    const newDiseases = currentDiseases.includes(disease)
      ? currentDiseases.filter((d) => d !== disease)
      : [...currentDiseases, disease]

    updatePetProfile('chronicDisease', newDiseases)
  }

  const handleSave = () => {
    const birthdate = petProfile.birthdate

    const petProfileData = {
      ...petProfile,
      birthdate,
    }

    const validationResult = petProfileSchema.safeParse(petProfileData)
    if (validationResult.success) {
      setPetSettingDone(true)
      if (disableRouting && onDone) {
        onDone()
      } else {
        navigate({ to: '/location-setting' }) // 예시는 다음 페이지 이동
      }
    } else {
      alert('입력값에 오류가 있습니다. 다시 확인해주세요.')
      setPetSettingDone(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const birthdate = petProfile.birthdate

    const currentData = {
      ...petProfile,
      birthdate,
    }

    const result = petProfileSchema.safeParse(currentData)
    setIsFormValid(result.success)
  }, [petProfile])

  return (
    <div className="flex flex-col gap-2  no-scrollbar">
      <h1 className="text-xl font-bold text-center">
        {isExistingProfile ? '반려동물 정보 수정' : UI_TEXT.PAGE_TITLE}
      </h1>

      <SelectionModal
        isOpen={isBreedModalOpen}
        onClose={() => setIsBreedModalOpen(false)}
        title={UI_TEXT.BREED_MODAL_TITLE}
        options={BREED_OPTIONS_DATA}
        onSelect={(value: string) => updatePetProfile('selectedBreed', value as Breed)}
        selectedValue={petProfile.selectedBreed}
      />

      <SelectionModal
        isOpen={isDiseaseModalOpen}
        onClose={() => setIsDiseaseModalOpen(false)}
        title={UI_TEXT.DISEASE_MODAL_TITLE}
        options={DISEASE_OPTIONS_DATA}
        onSelect={handleDiseaseToggle}
        selectedValue={petProfile.chronicDisease}
      />

      <ProfileSection
        name={petProfile.name}
        setName={(value: string) => updatePetProfile('name', value)}
      />

      <DefaultProfileSection
        birthdate={petProfile.birthdate}
        setBirthdate={(value: string) => updatePetProfile('birthdate', value)}
        gender={petProfile.gender}
        setGender={(value: GenderType) => updatePetProfile('gender', value)}
        neutralize={petProfile.neutralize}
        setNeutralize={(value: boolean) => updatePetProfile('neutralize', value)}
        vaccinated={petProfile.vaccinated}
        setVaccinated={(value: boolean) => updatePetProfile('vaccinated', value)}
        selectedBreed={petProfile.selectedBreed}
        setIsBreedModalOpen={setIsBreedModalOpen}
      />

      <DetailCharacterSection
        preferredWeather={petProfile.preferredWeather}
        setPreferredWeather={(value: string[]) => updatePetProfile('preferredWeather', value)}
        chronicDisease={petProfile.chronicDisease}
        setIsDiseaseModalOpen={setIsDiseaseModalOpen}
        preferredPaths={petProfile.preferredPaths}
        setPreferredPaths={(value: string[]) => updatePetProfile('preferredPaths', value)}
        personality={petProfile.personality}
        setPersonality={(value: 'extroverted' | 'introverted') =>
          updatePetProfile('personality', value)
        }
        weight={petProfile.weight}
        setWeight={(value: string) => updatePetProfile('weight', value)}
      />
      <button
        className={`w-full p-4 rounded-lg font-bold transition-colors ${
          isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-neutral-500 cursor-not-allowed'
        }`}
        onClick={handleSave}
        disabled={!isFormValid}
      >
        {UI_TEXT.SAVE_BUTTON}
      </button>
    </div>
  )
}

export default AddNewPetPage
