import TextButton from './TextButton'

export function OptionButtonGroup<T extends string | boolean>(props: {
  options: { value: T; label: string }[]
  selectedValue: T
  onSelect: (value: T) => void
}) {
  const { options, selectedValue, onSelect } = props
  return (
    <>
      {options.map(({ value, label }) => (
        <TextButton
          key={String(value)}
          onClick={() => onSelect(value)}
          isSelected={selectedValue === value}
        >
          {label}
        </TextButton>
      ))}
    </>
  )
}
