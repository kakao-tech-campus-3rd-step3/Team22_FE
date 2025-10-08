import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  { id: 1, title: '서비스 소개 1', description: '첫 번째 소개 내용' },
  { id: 2, title: '서비스 소개 2', description: '두 번째 소개 내용' },
  { id: 3, title: '서비스 소개 3', description: '세 번째 소개 내용' },
]

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity
}

export default function AnimatedSwipeCards() {
  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const cardIndex = ((page % cards.length) + cards.length) % cards.length

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="relative w-80 h-64">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={cards[cardIndex].id}
            className="absolute w-80 h-64 bg-white rounded-xl shadow-lg p-6 flex flex-col justify-center"
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
          >
            <h2 className="text-2xl font-bold mb-2">{cards[cardIndex].title}</h2>
            <p>{cards[cardIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex space-x-4 mt-8">
        <button
          onClick={() => paginate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          이전
        </button>
        <button
          onClick={() => paginate(1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          다음
        </button>
      </div>
    </div>
  )
}
