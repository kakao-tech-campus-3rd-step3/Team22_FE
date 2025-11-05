import type { ReactNode } from 'react'

function IconButton(props: {
  readonly icon: ReactNode
  readonly onClick: () => void
  readonly isSelected?: boolean
}) {
  const { icon, onClick, isSelected } = props
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full transition-colors duration-200 ${
        isSelected ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-neutral-300'
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
    </button>
  )
}

export default IconButton
