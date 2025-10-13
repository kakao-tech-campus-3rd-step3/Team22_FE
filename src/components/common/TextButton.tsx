function TextButton(props: {
  onClick: () => void
  isSelected: boolean
  children: React.ReactNode
}) {
  const { onClick, isSelected, children } = props
  return (
    <button
      onClick={onClick}
      className={`w-full p-2 rounded-md text-sm transition-colors ${
        isSelected ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-neutral-300'
      }`}
    >
      {children}
    </button>
  )
}

export default TextButton
