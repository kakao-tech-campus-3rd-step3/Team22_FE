interface SelectionModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  options: string[]
  onSelect: (option: string) => void
  selectedValue: string | string[]
}

function SelectionModal({
  isOpen,
  onClose,
  title,
  options,
  onSelect,
  selectedValue,
}: SelectionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-neutral-800 rounded-lg shadow-xl w-4/5 max-w-sm p-6">
        <div className="flex justify-between items-center border-b border-neutral-700 pb-3 mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="text-2xl text-neutral-400 hover:text-white">
            &times;
          </button>
        </div>

        <div className="space-y-3">
          {options.map((option) => {
            const isSelected = Array.isArray(selectedValue)
              ? selectedValue.includes(option)
              : selectedValue === option

            return (
              <button
                key={option}
                onClick={() => onSelect(option)}
                className={`w-full p-3 rounded-md text-sm font-semibold text-left transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {option}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SelectionModal
