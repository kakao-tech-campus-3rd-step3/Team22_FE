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
import { registerPet, type PetRegistrationRequest } from '@/api/pet'
import axios from 'axios'

function AddNewPetPage(props: { onDone?: () => void; disableRouting?: boolean }) {
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleSave = async () => {
    const birthdate = petProfile.birthdate

    const petProfileData = {
      ...petProfile,
      birthdate,
    }

    const validationResult = petProfileSchema.safeParse(petProfileData)

    if (!validationResult.success) {
      console.log('유효성 검사 실패:', validationResult.error)
      setPetSettingDone(false)
      return
    }

    setIsSubmitting(true)

    try {
      // API 요청 형식으로 데이터 변환
      const petRegistrationData: PetRegistrationRequest = {
        name: petProfile.name,
        breed: petProfile.selectedBreed,
        gender: petProfile.gender,
        birthDate: petProfile.birthdate,
        neutralize: petProfile.neutralize,
        vaccinated: petProfile.vaccinated,
        weight: parseFloat(petProfile.weight),
        preferredWeather: petProfile.preferredWeather[0] || '',
        chronicDisease: petProfile.chronicDisease[0] || '',
        preferredPath: petProfile.preferredPaths[0] || '',
      }

      // API 호출
      const response = await registerPet(petRegistrationData)
      console.log('반려동물 등록 성공:', response)

      setPetSettingDone(true)

      if (disableRouting && onDone) {
        onDone()
      } else {
        navigate({ to: '/location-setting' })
      }
    } catch (error) {
      console.error('반려동물 등록 실패:', error)
      setPetSettingDone(false)

      // axios 에러 처리
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // 서버 응답이 있는 경우
          console.error('서버 에러:', error.response.data)
          alert(`등록 실패: ${error.response.data?.message || '서버 오류가 발생했습니다.'}`)
        } else if (error.request) {
          // 요청은 보냈지만 응답을 받지 못한 경우
          console.error('네트워크 에러:', error.request)
          alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.')
        } else {
          // 요청 설정 중 에러가 발생한 경우
          console.error('요청 에러:', error.message)
          alert('요청 중 오류가 발생했습니다.')
        }
      } else {
        alert('알 수 없는 오류가 발생했습니다.')
      }
    } finally {
      setIsSubmitting(false)
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
    <div className="flex flex-col gap-2 no-scrollbar">
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
          isFormValid && !isSubmitting
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-neutral-500 cursor-not-allowed text-gray-300'
        }`}
        onClick={handleSave}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? '저장 중...' : UI_TEXT.SAVE_BUTTON}
      </button>
    </div>
  )
}

export default AddNewPetPage
