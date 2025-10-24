import { motion } from 'framer-motion'

const fadeInUpAnimation = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
}

export default function GuideStepCard(props: {
  title: string
  subtitle: string
  imageSrc: string
  buttonText: string
  onButtonClick: () => void
  children?: React.ReactNode
}) {
  const { title, subtitle, imageSrc, buttonText, onButtonClick, children } = props
  return (
    <div className="flex flex-col w-full h-full">
      <motion.div
        {...fadeInUpAnimation}
        className="rounded-2xl shadow-lg w-full max-w-md flex flex-col items-center p-8 text-white h-full"
      >
        <h1 className="text-3xl font-bold  text-center mb-2">{title}</h1>
        {subtitle && <p className="text-2xl mb-6 text-center whitespace-pre-line">{subtitle}</p>}
        {children ? (
          children
        ) : (
          <img src={imageSrc} alt="설명 이미지" className="w-full h-auto object-contain mb-8" />
        )}
        <button
          className="mt-auto w-full bg-blue-500 text-white font-bold text-lg py-3 rounded-xl hover:bg-blue-600 transition"
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      </motion.div>
    </div>
  )
}
