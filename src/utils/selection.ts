export function getIsSelected(selectedValue: string | string[], optionValue: string): boolean {
  return Array.isArray(selectedValue)
    ? selectedValue.includes(optionValue)
    : selectedValue === optionValue
}
