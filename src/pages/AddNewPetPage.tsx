import { useState, useEffect } from 'react'
import ProfileSection from './AddNewPetPageSections/ProfileSection'
import DefaultProfileSection from './AddNewPetPageSections/DefaultCharacterSection'
import DetailSetSection from './AddNewPetPageSections/DetailCharacterSection'
import SelectionModal from '@/components/common/SelectionModal'
import { petProfileSchema } from '@/types/petProfile'
import { UI_TEXT, BREED_OPTIONS_DATA, DISEASE_OPTIONS_DATA } from '@/constants/constants.ts'
import { usePetProfileState, type Breed } from '@/hooks/usePetProfileState'

function AddNewPetPage() {
  const [isFormValid, setIsFormValid] = useState(false)
  const { petProfile, updatePetProfile } = usePetProfileState()

  const [isBreedModalOpen, setIsBreedModalOpen] = useState(false)
  const [isDiseaseModalOpen, setIsDiseaseModalOpen] = useState(false)

  const getFormattedBirthdate = (year: string, month: string, day: string): string => {
    const y = year.trim()
    const m = month.trim()
    const d = day.trim()
    if (y && m && d) {
      const formattedMonth = m.padStart(2, '0')
      const formattedDay = d.padStart(2, '0')
      return `${y}-${formattedMonth}-${formattedDay}`
    }
    return ''
  }

  const handleDiseaseToggle = (disease: string) => {
    const currentDiseases = petProfile.selectedDiseases
    const newDiseases = currentDiseases.includes(disease)
      ? currentDiseases.filter((d) => d !== disease)
      : [...currentDiseases, disease]
    updatePetProfile('selectedDiseases', newDiseases)
  }

  const handleSave = () => {
    const birthdate = getFormattedBirthdate(
      petProfile.birthYear,
      petProfile.birthMonth,
      petProfile.birthDay,
    )

    const petProfileData = {
      ...petProfile,
      birthdate,
    }

    const validationResult = petProfileSchema.safeParse(petProfileData)
    if (validationResult.success) {
      alert('유효성 검사 성공!\n' + JSON.stringify(validationResult.data, null, 2))
    } else {
      alert('입력값에 오류가 있습니다. 다시 확인해주세요.')
    }
  }

  useEffect(() => {
    const birthdate = getFormattedBirthdate(
      petProfile.birthYear,
      petProfile.birthMonth,
      petProfile.birthDay,
    )

    const currentData = {
      ...petProfile,
      birthdate,
    }

    const result = petProfileSchema.safeParse(currentData)
    setIsFormValid(result.success)
  }, [petProfile])

  return (
    <>
      <h1 className="text-xl font-bold text-center">{UI_TEXT.PAGE_TITLE}</h1>

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
        selectedValue={petProfile.selectedDiseases}
      />

      <ProfileSection />

      <DefaultProfileSection
        gender={petProfile.gender}
        setGender={(value: 'male' | 'female') => updatePetProfile('gender', value)}
        neutralize={petProfile.neutralize}
        setNeutralize={(value: 'yes' | 'no') => updatePetProfile('neutralize', value)}
        vaccinated={petProfile.vaccinated}
        setVaccinated={(value: 'yes' | 'no') => updatePetProfile('vaccinated', value)}
        birthYear={petProfile.birthYear}
        setBirthYear={(value: string) => updatePetProfile('birthYear', value)}
        birthMonth={petProfile.birthMonth}
        setBirthMonth={(value: string) => updatePetProfile('birthMonth', value)}
        birthDay={petProfile.birthDay}
        setBirthDay={(value: string) => updatePetProfile('birthDay', value)}
        selectedBreed={petProfile.selectedBreed}
        setIsBreedModalOpen={setIsBreedModalOpen}
      />

      <DetailSetSection
        dayWeather={petProfile.dayWeather}
        setDayWeather={(value: string[]) => updatePetProfile('dayWeather', value)}
        nightWeather={petProfile.nightWeather}
        setNightWeather={(value: string[]) => updatePetProfile('nightWeather', value)}
        selectedDiseases={petProfile.selectedDiseases}
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
        className={`w-full p-4 rounded-lg font-bold mt-4 transition-colors ${
          isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-neutral-500 cursor-not-allowed'
        }`}
        onClick={handleSave}
        disabled={!isFormValid}
      >
        {UI_TEXT.SAVE_BUTTON}
      </button>
    </>
  )
}

export default AddNewPetPage
