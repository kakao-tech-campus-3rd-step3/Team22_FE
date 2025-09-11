import { useMapSetupStore } from '@/hooks/useMapSetupStore.ts'
import ButtonBar from '@/components/common/ButtonBar.tsx'
import { useNavigate } from '@tanstack/react-router'
import useKakaoStaticMap from '@/hooks/useKakaoStaticMap.ts'
import useKakaoMapLoader from '@/hooks/useKakaoMapLoader.ts'

export default function MapSetupComplete() {
  const loaded = useKakaoMapLoader()
  const { walkTimes, address, place, latitude, longitude } = useMapSetupStore()
  const navigate = useNavigate({ from: '/map-setup' })
  const { mapContainerRef } = useKakaoStaticMap({ latitude, longitude, loaded })

  const handleSetTime = () => {
    navigate({ to: '/location-setting' })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-800 font-sans">
      <div className="w-[390px] h-[844px] bg-[#121212] text-white shadow-2xl rounded-3xl overflow-y-auto p-6 space-y-6">
        <div className=" relative h-full w-full">
          <div className="flex-1 overflow-y-auto pb-20 px-4">
            <div className="flex justify-center mb-6">
              <div
                ref={mapContainerRef}
                className="w-[300px] h-[300px] rounded-xl"
              />
            </div>
            <div className="mb-6 p-4 bg-zinc-800 rounded-lg">
              <h2 className="text-xl mb-2 font-bold">{place}</h2>
              <h3 className="text-sm text-gray-300">{address}</h3>
            </div>
            <div className="h-[130px] p-4 bg-zinc-800 rounded-lg flex flex-col">
              <h2 className="font-bold mb-2 flex-shrink-0">주요 산책 시간</h2>
              <div className="flex-1 overflow-y-auto no-scrollbar">
                {walkTimes?.map((item) => (
                  <div key={item.id} className="flex justify-center gap-4 mb-1">
                    <div>{item.day}요일</div>
                    <div>{item.hour}시</div>
                    <div>{item.minute}분</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full z-10 ">
            <ButtonBar
              buttonText="주 산책 시간 설정하기"
              onButtonClick={handleSetTime}
            >
              <div className="text-white my-1.5">해당 시간에 알림 경로 추천 알림 받기</div>
            </ButtonBar>
          </div>
        </div>
      </div>
    </div>
  )
}
