export default function ConfirmModal(props: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  children: React.ReactNode
}) {
  const { isOpen, onClose, onConfirm, title, children } = props
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="w-4/5 max-w-sm rounded-lg bg-neutral-800 p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between border-b border-neutral-700 pb-3">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-2xl text-neutral-400 hover:text-white"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div className="mb-6 text-neutral-300">{children}</div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md bg-neutral-600 px-4 py-2 text-white hover:bg-neutral-500"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
          >
            설정하기
          </button>
        </div>
      </div>
    </div>
  )
}
