import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const cards = [
  { id: 1, title: '서비스 소개 1', description: '첫 번째 소개 내용', image: '/assets/intro_1.png' },
  { id: 2, title: '서비스 소개 2', description: '두 번째 소개 내용', image: '/assets/intro_2.png' },
  { id: 3, title: '서비스 소개 3', description: '세 번째 소개 내용', image: '/assets/intro_3.png' },
]

const swipeConfidenceThreshold = 10000
const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity

export default function IntroPage() {
  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

  const cardIndex = ((page % cards.length) + cards.length) % cards.length

  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <div className="relative w-80 max-w-md h-96 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={cards[cardIndex].id}
            className="absolute w-full h-full rounded-xl shadow-lg flex flex-col justify-start items-center"
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? 300 : -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x)
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
          >
            <img
              src={cards[cardIndex].image}
              alt={cards[cardIndex].title}
              className="w-full h-full object-fit rounded-lg"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-4 space-x-3">
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > page ? 1 : -1])}
            className={`w-3 h-3 rounded-full ${i === cardIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
