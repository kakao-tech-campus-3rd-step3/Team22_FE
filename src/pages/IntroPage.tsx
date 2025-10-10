import { useState, useEffect } from 'react'
import { useUIStore } from '@/stores/uiStore'
import GuideStepPage from '@/components/common/GuideStepCard'
import AddNewPetPage from './AddNewPetPage'
import LocationSettingPage from './LocationSettingPage'
import WalkingTimeSettingPage from './WalkingTimeSettingPage'
import RouteDrawPage from './RouteDrawPage'
import { useSetupStore } from '@/stores/setupStore'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Modal } from '@/components/common/Modal'
import { useNavigate } from '@tanstack/react-router'

export default function IntroPage() {
  const [step, setStep] = useState(0)
  const [isPetModalOpen, setIsPetModalOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [isWalkTimeModalOpen, setIsWalkTimeModalOpen] = useState(false)
  const [isMapsetModalOpen, setIsMapSetModalOpen] = useState(false)
  const setshowNavbar = useUIStore((state) => state.setShowNavbar)

  const isPetSettingDone = useSetupStore((s) => s.isPetSettingDone)
  const isLocationSettingDone = useSetupStore((s) => s.isLocationSettingDone)
  const isAllDone = useSetupStore(
    (s) => s.isPetSettingDone && s.isLocationSettingDone && s.isRouteDrawDone,
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (isAllDone) {
      navigate({ to: '/' })
    }
    setshowNavbar(false)
  })

  useEffect(() => {
    if (step === 1 && isPetSettingDone) {
      setIsPetModalOpen(false)
      setStep(2)
    } else if (step === 2 && isLocationSettingDone) {
      setIsLocationModalOpen(false)
      setStep(3)
    }
  }, [step, isPetSettingDone, isLocationSettingDone])

  const steps = [
    {
      title: '환영합니다!',
      subtitle: '서비스 이용을 위해 간단한 안내를 드릴게요.',
      imageSrc: '/assets/pet-walk.png',
      buttonText: '다음',
      onButtonClick: () => setStep(1),
    },
    {
      title: '반려견 정보 설정',
      subtitle: '반려견 정보를 입력해주세요',
      imageSrc: '/assets/petting-dog.png',
      buttonText: '설정하러 가기',
      onButtonClick: () => setIsPetModalOpen(true),
    },
    {
      title: '산책 위치 설정',
      subtitle: '산책 시작 위치와 시간을 설정해주세요',
      imageSrc: '/assets/walking-location-setting.png',
      buttonText: '설정하러 가기',
      onButtonClick: () => setIsLocationModalOpen(true),
    },
    {
      title: '산책 시간 설정',
      subtitle: '산책 시간을 설정해주세요',
      imageSrc: '/assets/walking-time-setting.png',
      buttonText: '설정하러 가기',
      onButtonClick: () => setIsWalkTimeModalOpen(true),
    },
    {
      title: '주 산책 경로 등록',
      subtitle: '주 산책 경로를 등록을 위해 산책을 진행해주세요, 나중에 변경할 수 있어요!',
      imageSrc: '',
      buttonText: '경로 등록하러가기',
      onButtonClick: () => setIsMapSetModalOpen(true),
    },
    {
      title: '모든 기본 설정 완료!',
      subtitle: '반려건의 정보를 포함하여 주로가는 산책길이 최고인지 판단해 드릴게요!',
      imageSrc: '/assets/petting-dog.png',
      buttonText: '서비스 이용하러가기',
      onButtonClick: () => navigate({ to: '/' }),
    },
  ]

  const { title, subtitle, imageSrc, buttonText, onButtonClick } = steps[step]

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-900 relative">
      <GuideStepPage
        title={title}
        subtitle={subtitle}
        imageSrc={imageSrc}
        buttonText={buttonText}
        onButtonClick={onButtonClick}
        children={
          step === 4 ? <DotLottieReact src="assets/setting-done.lottie" autoplay loop /> : null
        }
      />
      <Modal isOpen={isPetModalOpen} onClick={() => setIsPetModalOpen(false)}>
        <AddNewPetPage
          disableRouting={true}
          onDone={() => {
            setIsPetModalOpen(false)
            setStep(2)
          }}
        />
      </Modal>
      <Modal isOpen={isLocationModalOpen} onClick={() => setIsLocationModalOpen(false)}>
        <LocationSettingPage
          disableRouting={true}
          onDone={() => {
            setIsLocationModalOpen(false)
            setStep(3)
          }}
        />
      </Modal>
      <Modal isOpen={isWalkTimeModalOpen} onClick={() => setIsWalkTimeModalOpen(false)}>
        <WalkingTimeSettingPage
          disableRouting={true}
          onDone={() => {
            setIsWalkTimeModalOpen(false)
            setStep(4)
          }}
        />
      </Modal>
      <Modal isOpen={isMapsetModalOpen} onClick={() => setIsMapSetModalOpen(false)}>
        <RouteDrawPage
          disableRouting={true}
          onDone={() => {
            setIsMapSetModalOpen(false)
            setStep(5)
          }}
        />
      </Modal>
    </div>
  )
}
