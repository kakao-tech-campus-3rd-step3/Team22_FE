import { GENDER, BOOLEAN_CHOICE, UI_TEXT, type GenderType } from '@/constants/constants'
import InfoRow from '@/components/common/InfoRow'
import TextButton from '@/components/common/TextButton'
import TextModalButton from '@/components/common/TextModalButton'

function OptionButtonGroup<T extends string | boolean>(props: {
  options: { value: T; label: string }[]
  selectedValue: T
  onSelect: (value: T) => void
  className?: string
}) {
  const { options, selectedValue, onSelect } = props
  return (
    <>
      {options.map(({ value, label }) => (
        <TextButton
          key={String(value)}
          onClick={() => onSelect(value)}
          isSelected={selectedValue === value}
        >
          {label}
        </TextButton>
      ))}
    </>
  )
}

function DefaultCharacterSection(props: {
  selectedBreed: string
  setIsBreedModalOpen: (isOpen: boolean) => void

  gender: GenderType
  setGender: (value: GenderType) => void

  neutralize: boolean
  setNeutralize: (value: true | false) => void

  vaccinated: boolean
  setVaccinated: (value: true | false) => void

  birthdate: string
  setBirthdate: (value: string) => void
}) {
  const {
    selectedBreed,
    setIsBreedModalOpen,
    gender,
    setGender,
    neutralize,
    setNeutralize,
    vaccinated,
    setVaccinated,
    birthdate,
    setBirthdate,
  } = props

  const [year, month, day] = birthdate ? birthdate.split('-') : ['', '', '']

  // 2. 날짜 일부(년/월/일)를 업데이트하는 핸들러 함수
  const handleDateChange = (part: 'year' | 'month' | 'day', value: string) => {
    // 현재 birthdate 값을 기준으로 새로운 날짜 조합
    let newYear = year
    let newMonth = month
    let newDay = day

    if (part === 'year') newYear = value
    if (part === 'month') newMonth = value
    if (part === 'day') newDay = value

    // YYYY-MM-DD 형식의 부분적인 문자열이라도 부모 상태로 바로 업데이트
    setBirthdate(`${newYear}-${newMonth}-${newDay}`)
  }

  const dateFields = [
    {
      key: 'year',
      placeholder: '년도 (4자리)',
      maxLength: 4,
      value: year, // 파생된 값 사용
      setter: (val: string) => handleDateChange('year', val), // 핸들러 호출
      pattern: /^\d{0,4}$/,
    },
    {
      key: 'month',
      placeholder: '월',
      maxLength: 2,
      value: month, // 파생된 값 사용
      setter: (val: string) => handleDateChange('month', val), // 핸들러 호출
      pattern: /^\d{0,2}$/,
    },
    {
      key: 'day',
      placeholder: '일',
      maxLength: 2,
      value: day, // 파생된 값 사용
      setter: (val: string) => handleDateChange('day', val), // 핸들러 호출
      pattern: /^\d{0,2}$/,
    },
  ]

  return (
    <div className="bg-neutral-900 p-4 rounded-lg flex flex-col gap-4">
      <InfoRow label={UI_TEXT.BREED_TYPE}>
        <TextModalButton
          selectedStatus={selectedBreed}
          buttonTypeText={UI_TEXT.BREED_MODAL_TITLE}
          setIsBreedModalOpen={setIsBreedModalOpen}
        />
      </InfoRow>

      <InfoRow label={UI_TEXT.SEX}>
        <OptionButtonGroup
          options={[
            { value: GENDER.MALE, label: UI_TEXT.BOY },
            { value: GENDER.FEMALE, label: UI_TEXT.GIRL },
          ]}
          selectedValue={gender}
          onSelect={setGender}
        />
      </InfoRow>

      <InfoRow label={UI_TEXT.BIRTH_DATE}>
        <div className="grid grid-cols-3 gap-2">
          {dateFields.map(({ key, placeholder, maxLength, value, setter, pattern }) => (
            <input
              key={key}
              type="text"
              placeholder={placeholder}
              className="w-full bg-neutral-700 p-2 rounded-md text-sm text-center"
              value={value}
              maxLength={maxLength}
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={(e) => {
                if (pattern.test(e.target.value)) {
                  setter(e.target.value)
                }
              }}
            />
          ))}
        </div>
      </InfoRow>

      <InfoRow label={UI_TEXT.NETURALIZE}>
        <OptionButtonGroup<boolean>
          options={[
            { value: BOOLEAN_CHOICE.YES, label: UI_TEXT.YES },
            { value: BOOLEAN_CHOICE.NO, label: UI_TEXT.NO },
          ]}
          selectedValue={neutralize}
          onSelect={setNeutralize}
        />
      </InfoRow>

      <InfoRow label={UI_TEXT.VACCINATED}>
        <OptionButtonGroup<boolean>
          options={[
            { value: BOOLEAN_CHOICE.YES, label: UI_TEXT.YES },
            { value: BOOLEAN_CHOICE.NO, label: UI_TEXT.NO },
          ]}
          selectedValue={vaccinated}
          onSelect={setVaccinated}
        />
      </InfoRow>
    </div>
  )
}

export default DefaultCharacterSection
