import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function LoadingBox(props: { hsize: string }) {
  return (
    <div className={`w-full flex justify-center h-${props.hsize}`}>
      <div className="w-full max-w-lg  overflow-auto rounded-lg no-scrollbar bg-zinc-800 flex flex-col items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-white" />
      </div>
    </div>
  )
}
