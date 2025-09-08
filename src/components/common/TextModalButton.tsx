interface TextModalButtonProps {
  selectedStatus: string;
  buttonTypeText: string;
  setIsBreedModalOpen: (isOpen: boolean) => void;
}

function TextModalButton({
  selectedStatus,
  buttonTypeText,
  setIsBreedModalOpen,
}: TextModalButtonProps) {
  return (
    <button
      onClick={() => setIsBreedModalOpen(true)}
      className="w-full text-left bg-neutral-700 p-2 rounded-md text-sm text-neutral-300 truncate"
    >
      {selectedStatus || buttonTypeText}
    </button>
  );
}

export default TextModalButton;
