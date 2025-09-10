export default function ButtonBar(props: {
  children: React.ReactNode
  buttonText: string
  onButtonClick: () => void
}) {
  return (
    <div className="w-full">
      <div
        className="
          absolute bottom-0 left-0 w-full
          flex flex-col px-4 py-4 bg-zinc-900 font-bold"
      >
        <div className="h-full overflow-y-auto pb-4">{props.children}</div>
        <button
          className="h-12 my-1.5 text-white bg-indigo-600 rounded-xl cursor-pointer"
          onClick={props.onButtonClick}
        >
          {props.buttonText}
        </button>
      </div>
    </div>
  )
}
