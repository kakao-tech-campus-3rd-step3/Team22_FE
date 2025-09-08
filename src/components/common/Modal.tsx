import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-neutral-800 rounded-lg shadow-xl w-4/5 max-w-sm p-6">
        <div className="flex justify-between items-center border-b border-neutral-700 pb-3 mb-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-2xl text-neutral-400 hover:text-white"
          >
            &times;
          </button>
        </div>
        <div className="space-y-3">{children}</div>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 p-3 rounded-lg font-bold mt-6"
        >
          확인
        </button>
      </div>
    </div>
  );
}
export default Modal;
