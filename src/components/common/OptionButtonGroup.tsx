import TextButton from './TextButton'

export function OptionButtonGroup<T extends string | boolean>(props: {
  options: { value: T; label: string }[]
  selectedValue: T
  onSelect: (value: T) => void
  className?: string
}) {
  return (
    <>
      {props.options.map(({ value, label }) => (
        <TextButton
          key={String(value)}
          onClick={() => props.onSelect(value)}
          isSelected={props.selectedValue === value}
        >
          {label}
        </TextButton>
      ))}
    </>
  )
}
