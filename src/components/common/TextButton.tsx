function TextButton(props: {
  onClick: () => void
  isSelected: boolean
  children: React.ReactNode
}) {
  return (
    <button
      onClick={props.onClick}
      className={`w-full p-2 rounded-md text-sm transition-colors ${
        props.isSelected ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-neutral-300'
      }`}
    >
      {props.children}
    </button>
  )
}

export default TextButton
