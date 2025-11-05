type ButtonProps = {
  onClick: () => void
  isSelected?: boolean
  variant?: 'normal' | 'modal'
  align?: 'left' | 'center'
  truncate?: boolean
  children: React.ReactNode
}

export function AppButton({
  onClick,
  isSelected = false,
  variant = 'normal',
  align = 'center',
  truncate = false,
  children,
}: ButtonProps) {
  const base = 'w-full p-2 rounded-md text-sm transition-colors'
  const selectedClass = isSelected ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-neutral-300'

  const variantClass = variant === 'modal' ? 'bg-neutral-700 text-left truncate' : ''
  const alignClass = align === 'left' ? 'text-left' : 'text-center'
  const truncateClass = truncate ? 'truncate' : ''

  return (
    <button
      onClick={onClick}
      className={`${base} ${selectedClass} ${variantClass} ${alignClass} ${truncateClass}`}
    >
      {children}
    </button>
  )
}
