import { useUIStore } from '@/stores/uiStore'
import { useEffect } from 'react'
import IntroSection from './IntroPageSections/IntroSection'
import InfoRow from '@/components/common/InfoRow'
import { CiCircleCheck } from 'react-icons/ci'
import { IoMdWalk } from 'react-icons/io'
import StatusIcon from '@/components/common/StatusIcon'
import { PiDog } from 'react-icons/pi'
import { useNavigate } from '@tanstack/react-router'
import { useSetupStore } from '@/stores/setupStore'

export default function IntroPage() {
  const { isPetSettingDone, isLocationSettingDone, isRouteDrawDone } = useSetupStore()

  const isAllDone = isPetSettingDone && isLocationSettingDone && isRouteDrawDone

  const setShowNavbar = useUIStore((state) => state.setShowNavbar)
  useEffect(() => {
    setShowNavbar(false)
  }, [setShowNavbar])
  const navigate = useNavigate()

  const handleAddNewPet = () => {
    navigate({ to: '/add-new-pet' })
  }
  const handlelocationSetting = () => {
    navigate({ to: '/location-setting' })
  }

  const handlerouteDraw = () => {
    navigate({ to: '/route-draw' })
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-96">
      <div className="flex flex-col w-80 max-w-md h-96 gap-5">
        <IntroSection />
        {isAllDone && (
          <div className="text-green-400 font-bold text-center mb-4">
            모든 설정을 완료하셨습니다!
          </div>
        )}
        <InfoRow label="">
          <button
            className="flex bg-neutral-800 rounded-lg shadow-xl p-6 w-full items-center gap-2"
            onClick={handleAddNewPet}
          >
            <StatusIcon
              status={isPetSettingDone ? 'success' : 'warning'}
              icon={<PiDog className="w-10 h-10 max-w-full max-h-32" />}
            />
            <span>{isPetSettingDone ? '설정완료!' : '반려견 정보를 설정해주세요.'}</span>
          </button>
        </InfoRow>
        <InfoRow label="">
          <button
            className="flex bg-neutral-800 rounded-lg shadow-xl p-6 w-full items-center gap-2"
            onClick={handlelocationSetting}
          >
            <StatusIcon
              status={isLocationSettingDone ? 'success' : 'warning'}
              icon={<IoMdWalk className="w-10 h-10 max-w-full max-h-32" />}
            />
            <span>주 산책 시작 위치, 시작시간을 설정해주세요</span>
          </button>
        </InfoRow>
        <InfoRow label="">
          <button
            className="flex bg-neutral-800 rounded-lg shadow-xl p-6 w-full items-center gap-2"
            onClick={handlerouteDraw}
          >
            <StatusIcon
              status={isRouteDrawDone ? 'success' : 'warning'}
              icon={<CiCircleCheck className="w-10 h-10 max-w-full max-h-32" />}
            />
            <span>산책을 설정한 위치, 시간에 맞추어 해주세요</span>
          </button>
        </InfoRow>
      </div>
    </div>
  )
}
