import InfoRow from '@/components/common/InfoRow'
import TextButton from '@/components/common/TextButton'
import TextModalButton from '@/components/common/TextModalButton'

interface DefaultProfileSectionProps {
  selectedBreed: string
  setIsBreedModalOpen: (isOpen: boolean) => void
  gender: string
  setGender: (value: string) => void
  neturalize: string
  setNeturalize: (value: string) => void
  vaccinated: string
  setVaccinated: (value: string) => void
  birthYear: string
  setBirthYear: (value: string) => void
  birthMonth: string
  setBirthMonth: (value: string) => void
  birthDay: string
  setBirthDay: (value: string) => void
}

function DefaultCharacterSection({
  selectedBreed,
  setIsBreedModalOpen,
  gender,
  setGender,
  neturalize,
  setNeturalize,
  vaccinated,
  setVaccinated,
  birthYear,
  setBirthYear,
  birthMonth,
  setBirthMonth,
  birthDay,
  setBirthDay,
}: DefaultProfileSectionProps) {
  return (
    <div className="bg-neutral-900 p-4 rounded-lg">
      <InfoRow label="반려견종">
        <TextModalButton
          selectedStatus={selectedBreed}
          buttonTypeText="견종 선택"
          setIsBreedModalOpen={setIsBreedModalOpen}
        />
      </InfoRow>
      <InfoRow label="성별">
        <TextButton onClick={() => setGender('male')} isSelected={gender === 'male'}>
          남아
        </TextButton>
        <TextButton onClick={() => setGender('female')} isSelected={gender === 'female'}>
          여아
        </TextButton>
      </InfoRow>
      <InfoRow label="생년월일">
        <input
          type="text"
          placeholder="년도 (4자리)"
          className="w-full bg-neutral-700 p-2 rounded-md text-sm text-center"
          value={birthYear}
          onChange={(e) => {
            const val = e.target.value
            if (/^\d{0,4}$/.test(val)) {
              setBirthYear(val)
            }
          }}
          maxLength={4}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input
          type="text"
          placeholder="월"
          className="w-full bg-neutral-700 p-2 rounded-md text-sm text-center"
          value={birthMonth}
          onChange={(e) => {
            const val = e.target.value
            if (/^\d{0,2}$/.test(val)) {
              setBirthMonth(val)
            }
          }}
          maxLength={2}
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input
          type="text"
          placeholder="일"
          className="w-full bg-neutral-700 p-2 rounded-md text-sm text-center"
          value={birthDay}
          onChange={(e) => {
            const val = e.target.value
            if (/^\d{0,2}$/.test(val)) {
              setBirthDay(val)
            }
          }}
          maxLength={2}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </InfoRow>
      <InfoRow label="중성화여부">
        <TextButton onClick={() => setNeturalize('yes')} isSelected={neturalize === 'yes'}>
          예
        </TextButton>
        <TextButton onClick={() => setNeturalize('no')} isSelected={neturalize === 'no'}>
          아니오
        </TextButton>
      </InfoRow>
      <InfoRow label="예방접종여부" className="border-none">
        <TextButton onClick={() => setVaccinated('yes')} isSelected={vaccinated === 'yes'}>
          예
        </TextButton>
        <TextButton onClick={() => setVaccinated('no')} isSelected={vaccinated === 'no'}>
          아니오
        </TextButton>
      </InfoRow>
    </div>
  )
}

export default DefaultCharacterSection
