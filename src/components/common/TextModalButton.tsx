import { AppButton } from './AppButton'

export default function TextModalButton(props: {
  selectedStatus: string
  buttonTypeText: string
  setIsBreedModalOpen: (isOpen: boolean) => void
}) {
  const { selectedStatus, buttonTypeText, setIsBreedModalOpen } = props
  return (
    <AppButton onClick={() => setIsBreedModalOpen(true)} variant="modal" align="left" truncate>
      {selectedStatus || buttonTypeText}
    </AppButton>
  )
}
