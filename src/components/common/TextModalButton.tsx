function TextModalButton(props: {
  selectedStatus: string
  buttonTypeText: string
  setIsBreedModalOpen: (isOpen: boolean) => void
}) {
  const { selectedStatus, buttonTypeText, setIsBreedModalOpen } = props
  return (
    <button
      onClick={() => setIsBreedModalOpen(true)}
      className="w-full text-left bg-neutral-700 p-2 rounded-md text-sm text-neutral-300 truncate"
    >
      {selectedStatus || buttonTypeText}
    </button>
  )
}

export default TextModalButton
