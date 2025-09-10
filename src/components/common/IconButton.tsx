import type { ReactNode } from 'react'

function IconButton(props: { icon: ReactNode; onClick: () => void; isSelected?: boolean }) {
  return (
    <button
      onClick={props.onClick}
      className={`p-3 rounded-full transition-colors duration-200 ${
        props.isSelected ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-neutral-300'
      }`}
    >
      <div className="w-6 h-6 flex items-center justify-center">{props.icon}</div>
    </button>
  )
}

export default IconButton
