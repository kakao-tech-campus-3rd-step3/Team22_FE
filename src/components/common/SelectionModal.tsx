import { getIsSelected } from '@/utils/selection'
import { Modal } from './Modal'

type Option = { readonly value: string; readonly label: string }

export default function SelectionModal({
  isOpen,
  onClose,
  title,
  options,
  onSelect,
  selectedValue,
}: {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly title: string
  readonly options: readonly Option[]
  readonly onSelect: (value: string) => void
  readonly selectedValue: string | string[]
}) {
  return (
    <Modal isOpen={isOpen} onClick={onClose}>
      <div className="flex justify-between items-center border-b border-neutral-700 pb-3 mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = getIsSelected(selectedValue, option.value)
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
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
      <button
        className="mt-4 p-2 bg-blue-600 rounded-md text-sm font-semibold text-center transition-colors w-1/2"
        onClick={onClose}
      >
        선택완료
      </button>
    </Modal>
  )
}
