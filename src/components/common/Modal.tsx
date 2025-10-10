import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'

interface ModalProps {
  children: React.ReactNode
  onClick: () => void
  isOpen: boolean
}

export function Modal({ children, onClick, isOpen }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClick}
        >
          <motion.div
            className="w-[390px] h-[844px] rounded-lg shadow-lg max-w-lg max-h-[90vh] overflow-auto p-4 relative bg-zinc-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 닫힘 방지
          >
            <button
              onClick={onClick}
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
