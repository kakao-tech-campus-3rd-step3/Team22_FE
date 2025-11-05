import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react'
import { FaCheck, FaChevronDown } from 'react-icons/fa'

export default function CustomSelect<T extends string | number>(props: {
  readonly value: T
  readonly options: readonly T[]
  readonly onChange: (value: T) => void
}) {
  const { value, options, onChange } = props
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-24">
        <ListboxButton className="relative w-full bg-zinc-700 text-white rounded px-3 py-1 flex justify-between items-center">
          <span>{value}</span>
          <FaChevronDown className="w-4 h-4 ml-1" aria-hidden="true" />
        </ListboxButton>
        <ListboxOptions className="absolute mt-1 w-full bg-zinc-800 border border-zinc-600 rounded shadow-lg max-h-56 overflow-auto z-50">
          {options.map((option) => (
            <ListboxOption
              key={option.toString()}
              value={option}
              className="cursor-pointer py-2 px-3 text-white data-[focus]:bg-indigo-500 data-[selected]:text-indigo-300 flex justify-between items-center"
            >
              {({ selected }: { selected: boolean }) => (
                <>
                  <span>{option}</span>
                  {selected ? (
                    <FaCheck className="w-4 h-4 ml-2 text-indigo-300" aria-hidden="true" />
                  ) : null}
                </>
              )}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
