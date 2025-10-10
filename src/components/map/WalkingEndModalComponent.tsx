import { formatTime, getTotalSeconds } from '@/utils/timeCalculation.ts'
import { useNavigate } from '@tanstack/react-router'
import { walkingResultSchema, type WalkingResultState } from '@/types/routeResult.ts'
import useCreatePath from '@/hooks/useCreatePath.ts'
import { walkingPath } from '@/mocks/testdata.ts'
import { useSetupStore } from '@/stores/setupStore'

export default function WalkingEndModalComponent(props: {
  totalDistance: number
  elapsedTime: number
  route: { lat: number; lng: number }[]
  setEndModal: (value: boolean) => void
  handleEndWalking: () => void
  onDone?: () => void
}) {
  const { totalDistance, elapsedTime, route, setEndModal, handleEndWalking, onDone } = props
  const navigate = useNavigate()
  const createPathMutation = useCreatePath()
  const setRouteDrawDone = useSetupStore((state) => state.setRouteDrawDone)

  const handleSubmitResult = () => {
    const rawResult = {
      totalDistance_m: totalDistance,
      walkingTime_sec: getTotalSeconds(elapsedTime),
      path: route,
    }
    console.log('rawResult', rawResult) // TODO: Remove mock data API 추가필요. walks
    const mockRoute = walkingPath

    const parsed = walkingResultSchema.safeParse(mockRoute)

    if (!parsed.success) {
      alert('산책 기록 데이터가 유효하지 않습니다.')
      return
    }

    const result: WalkingResultState = parsed.data

    createPathMutation.mutate(result)

    handleEndWalking()

    if (onDone) {
      setRouteDrawDone(true)
      onDone()
    } else {
      navigate({ to: '/' })
    }
  }

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-xl font-bold mb-4">산책을 종료하시겠습니까?</h2>
        <p className="mb-2 font-bold">산책 거리: {(totalDistance / 1000).toFixed(2)} km</p>
        <p className="mb-6 font-bold">산책 시간: {formatTime(elapsedTime)}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleSubmitResult}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded cursor-pointer"
          >
            종료하기
          </button>
          <button
            onClick={() => setEndModal(false)}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded cursor-pointer"
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  )
}
