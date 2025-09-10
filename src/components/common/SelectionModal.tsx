type Option = {
  readonly value: string
  readonly label: string
}

function SelectionModal(props: {
  isOpen: boolean
  onClose: () => void
  title: string
  options: readonly Option[]
  onSelect: (value: string) => void
  selectedValue: string | string[]
}) {
  if (!props.isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-neutral-800 rounded-lg shadow-xl w-4/5 max-w-sm p-6">
        <div className="flex justify-between items-center border-b border-neutral-700 pb-3 mb-4">
          <h2 className="text-lg font-bold">{props.title}</h2>
          <button onClick={props.onClose} className="text-2xl text-neutral-400 hover:text-white">
            &times;
          </button>
        </div>

        <div className="space-y-3">
          {props.options.map((option) => {
            const isSelected = Array.isArray(props.selectedValue)
              ? props.selectedValue.includes(option.value)
              : props.selectedValue === option.value

            return (
              <button
                key={option.value}
                onClick={() => props.onSelect(option.value)}
                className={`w-full p-3 rounded-md text-sm font-semibold text-left transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SelectionModal
