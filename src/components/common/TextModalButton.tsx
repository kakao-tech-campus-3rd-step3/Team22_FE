function TextModalButton(props: {
  selectedStatus: string
  buttonTypeText: string
  setIsBreedModalOpen: (isOpen: boolean) => void
}) {
  return (
    <button
      onClick={() => props.setIsBreedModalOpen(true)}
      className="w-full text-left bg-neutral-700 p-2 rounded-md text-sm text-neutral-300 truncate"
    >
      {props.selectedStatus || props.buttonTypeText}
    </button>
  )
}

export default TextModalButton
