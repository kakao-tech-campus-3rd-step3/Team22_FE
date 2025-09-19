import { useState, useEffect } from 'react'
import ProfileSection from './AddNewPetPageSections/ProfileSection'
import DefaultProfileSection from './AddNewPetPageSections/DefaultCharacterSection'
import DetailSetSection from './AddNewPetPageSections/DetailCharacterSection'
import SelectionModal from '@/components/common/SelectionModal'
import { petProfileSchema } from '@/types/petProfile'
import {
  GENDER,
  BOOLEAN_CHOICE,
  PERSONALITY,
  UI_TEXT,
  BREED_OPTIONS_DATA, // 이 부분을 추가하세요
  DISEASE_OPTIONS_DATA,
} from '@/constants/constants.ts'

function AddNewPetPage() {
  const [isFormValid, setIsFormValid] = useState(false)
  const [gender, setGender] = useState<string>(GENDER.MALE)
  const [neutralize, setNeutralize] = useState<string>(BOOLEAN_CHOICE.NO)
  const [vaccinated, setVaccinated] = useState<string>(BOOLEAN_CHOICE.NO)
  const [dayWeather, setDayWeather] = useState<string[]>([])
  const [nightWeather, setNightWeather] = useState<string[]>([])
  const [preferredPaths, setPreferredPaths] = useState<string[]>([])
  const [personality, setPersonality] = useState<string>(PERSONALITY.EXTROVERTED)
  const [isBreedModalOpen, setIsBreedModalOpen] = useState(false)
  const [isDiseaseModalOpen, setIsDiseaseModalOpen] = useState(false)
  const [selectedBreed, setSelectedBreed] = useState<string>('')
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([])
  const [birthYear, setBirthYear] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [weight, setWeight] = useState('20')

  const handleBreedSelect = (breed: string) => {
    setSelectedBreed(breed)
    setIsBreedModalOpen(false)
  }

  const handleDiseaseToggle = (disease: string) => {
    setSelectedDiseases((prev) =>
      prev.includes(disease) ? prev.filter((d) => d !== disease) : [...prev, disease],
    )
  }

  const handleSave = () => {
    const birthdate = getFormattedBirthdate(birthYear, birthMonth, birthDay)

    const petProfileData = {
      selectedBreed,
      gender,
      neutralize,
      vaccinated,
      personality,
      dayWeather,
      nightWeather,
      preferredPaths,
      selectedDiseases,
      birthdate,
      weight,
    }

    const validationResult = petProfileSchema.safeParse(petProfileData)
    if (validationResult.success) {
      alert('유효성 검사 성공!\n' + JSON.stringify(validationResult.data, null, 2))
    } else {
      console.error('Validation failed:', validationResult.error.flatten().fieldErrors)
      alert('입력값에 오류가 있습니다. 다시 확인해주세요.')
    }
  }
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

  useEffect(() => {
    const birthdate = getFormattedBirthdate(birthYear, birthMonth, birthDay)

    const currentData = {
      selectedBreed,
      gender,
      neutralize,
      vaccinated,
      personality,
      dayWeather,
      nightWeather,
      preferredPaths,
      selectedDiseases,
      birthdate,
      weight,
    }

    const result = petProfileSchema.safeParse(currentData)
    if (!result.success) {
      console.log('유효성 검사 실패 원인:', result.error.flatten().fieldErrors)
    }
    setIsFormValid(result.success)
  }, [
    selectedBreed,
    gender,
    neutralize,
    vaccinated,
    personality,
    dayWeather,
    nightWeather,
    preferredPaths,
    selectedDiseases,
    birthYear,
    birthMonth,
    birthDay,
    weight,
  ])

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-800 font-sans">
      <div className="w-[390px] h-[844px] bg-[#121212] text-white shadow-2xl rounded-3xl overflow-y-auto p-6 space-y-6">
        <h1 className="text-xl font-bold text-center">{UI_TEXT.PAGE_TITLE}</h1>
        <SelectionModal
          isOpen={isBreedModalOpen}
          onClose={() => setIsBreedModalOpen(false)}
          title={UI_TEXT.BREED_MODAL_TITLE}
          options={BREED_OPTIONS_DATA}
          onSelect={handleBreedSelect}
          selectedValue={selectedBreed}
        />
        <SelectionModal
          isOpen={isDiseaseModalOpen}
          onClose={() => setIsDiseaseModalOpen(false)}
          title={UI_TEXT.DISEASE_MODAL_TITLE}
          options={DISEASE_OPTIONS_DATA}
          onSelect={handleDiseaseToggle}
          selectedValue={selectedDiseases}
        />
        <ProfileSection />
        <DefaultProfileSection
          selectedBreed={selectedBreed}
          setIsBreedModalOpen={setIsBreedModalOpen}
          gender={gender}
          setGender={setGender}
          neutralize={neutralize}
          setNeutralize={setNeutralize}
          vaccinated={vaccinated}
          setVaccinated={setVaccinated}
          birthYear={birthYear}
          setBirthYear={setBirthYear}
          birthMonth={birthMonth}
          setBirthMonth={setBirthMonth}
          birthDay={birthDay}
          setBirthDay={setBirthDay}
        />
        <DetailSetSection
          dayWeather={dayWeather}
          setDayWeather={setDayWeather}
          nightWeather={nightWeather}
          setNightWeather={setNightWeather}
          selectedDiseases={selectedDiseases}
          setIsDiseaseModalOpen={setIsDiseaseModalOpen}
          preferredPaths={preferredPaths}
          setPreferredPaths={setPreferredPaths}
          personality={personality}
          setPersonality={setPersonality}
          weight={weight}
          setWeight={setWeight}
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
      </div>
    </div>
  )
}

export default AddNewPetPage
