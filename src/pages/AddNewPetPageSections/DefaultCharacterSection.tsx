import { GENDER, BOOLEAN_CHOICE, UI_TEXT } from '@/constants/constants'
import InfoRow from '@/components/common/InfoRow'
import TextButton from '@/components/common/TextButton'
import TextModalButton from '@/components/common/TextModalButton'
import type { Dispatch, SetStateAction } from 'react'

function OptionButtonGroup<T extends string>(props: {
  options: { value: T; label: string }[]
  selectedValue: T
  onSelect: (value: T) => void
  className?: string
}) {
  return (
    <>
      {props.options.map(({ value, label }) => (
        <TextButton
          key={value}
          onClick={() => props.onSelect(value)}
          isSelected={props.selectedValue === value}
        >
          {label}
        </TextButton>
      ))}
    </>
  )
}

type DateField = {
  key: 'birthYear' | 'birthMonth' | 'birthDay'
  placeholder: string
  maxLength: number
  value: string
  setter: Dispatch<SetStateAction<string>>
  pattern: RegExp
}

function DefaultCharacterSection(props: {
  selectedBreed: string
  setIsBreedModalOpen: (isOpen: boolean) => void
  gender: string
  setGender: Dispatch<SetStateAction<string>>
  neutralize: string
  setNeutralize: Dispatch<SetStateAction<string>>
  vaccinated: string
  setVaccinated: Dispatch<SetStateAction<string>>
  birthYear: string
  setBirthYear: Dispatch<SetStateAction<string>>
  birthMonth: string
  setBirthMonth: Dispatch<SetStateAction<string>>
  birthDay: string
  setBirthDay: Dispatch<SetStateAction<string>>
}) {
  const dateFields: DateField[] = [
    {
      key: 'birthYear',
      placeholder: '년도 (4자리)',
      maxLength: 4,
      value: props.birthYear,
      setter: props.setBirthYear,
      pattern: /^\d{0,4}$/,
    },
    {
      key: 'birthMonth',
      placeholder: '월',
      maxLength: 2,
      value: props.birthMonth,
      setter: props.setBirthMonth,
      pattern: /^\d{0,2}$/,
    },
    {
      key: 'birthDay',
      placeholder: '일',
      maxLength: 2,
      value: props.birthDay,
      setter: props.setBirthDay,
      pattern: /^\d{0,2}$/,
    },
  ]

  return (
    <div className="bg-neutral-900 p-4 rounded-lg">
      <InfoRow label={UI_TEXT.BREED_TYPE}>
        <TextModalButton
          selectedStatus={props.selectedBreed}
          buttonTypeText={UI_TEXT.BREED_MODAL_TITLE}
          setIsBreedModalOpen={props.setIsBreedModalOpen}
        />
      </InfoRow>

      <InfoRow label={UI_TEXT.SEX}>
        <OptionButtonGroup
          options={[
            { value: GENDER.MALE, label: UI_TEXT.BOY },
            { value: GENDER.FEMALE, label: UI_TEXT.GIRL },
          ]}
          selectedValue={props.gender}
          onSelect={props.setGender}
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
        <OptionButtonGroup
          options={[
            { value: BOOLEAN_CHOICE.YES, label: UI_TEXT.YES },
            { value: BOOLEAN_CHOICE.NO, label: UI_TEXT.NO },
          ]}
          selectedValue={props.neutralize}
          onSelect={props.setNeutralize}
        />
      </InfoRow>

      <InfoRow label={UI_TEXT.VACCINATED} className="border-none">
        <OptionButtonGroup
          options={[
            { value: BOOLEAN_CHOICE.YES, label: UI_TEXT.YES },
            { value: BOOLEAN_CHOICE.NO, label: UI_TEXT.NO },
          ]}
          selectedValue={props.vaccinated}
          onSelect={props.setVaccinated}
        />
      </InfoRow>
    </div>
  )
}

export default DefaultCharacterSection
