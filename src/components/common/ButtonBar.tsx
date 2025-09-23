export default function ButtonBar(props: {
  children: React.ReactNode
  buttonText: string
  onButtonClick: () => void
  isButtonDisable: boolean
}) {
  const { children, buttonText, onButtonClick, isButtonDisable } = props
  return (
    <div className="w-full">
      <div
        className="
          absolute bottom-0 left-0 w-full
          flex flex-col px-4 py-4 bg-zinc-900 font-bold"
      >
        <div className="h-full overflow-y-auto pb-4">{children}</div>
        <button
          className={`h-12 my-1.5 text-white rounded-xl ${
            isButtonDisable
              ? 'bg-gray-500 cursor-not-allowed opacity-60'
              : 'bg-indigo-600 cursor-pointer hover:bg-indigo-500'
          }`}
          onClick={onButtonClick}
          disabled={isButtonDisable}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
