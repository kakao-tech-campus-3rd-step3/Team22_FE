import useLocation from '@/hooks/useLocation.ts'
import LoadingBox from './LoadingBox'
import useWeatherScore from '@/hooks/useWeatherScore.ts'

export default function WeatherTable() {
  const { initialLocation, status } = useLocation()
  const {
    data: walkScores,
    isLoading: walkScoresLoading,
    isError: walkScoresError
  } = useWeatherScore({ initialLocation })

  console.log(walkScores)

  if (walkScoresLoading || status === 'loading') return <LoadingBox hsize="72" />

  if (status === 'denied') {
    return <div className="text-center text-red-500 font-bold p-4">위치 권한을 허용해주세요.</div>
  }

  if (walkScoresError || !walkScores) {
    return <div>날씨 정보를 불러올 수 없습니다.</div>
  }

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-lg h-72 overflow-auto rounded-lg no-scrollbar border border-zinc-700">
        <table className="min-w-full text-white bg-zinc-800">
          <thead className="bg-zinc-900 sticky top-0">
          <tr className="text-center text-sm">
            <th className="py-3 font-semibold">시간</th>
            <th className="py-3 font-semibold">날씨</th>
            <th className="py-3 font-semibold">기온 (°C)</th>
            <th className="py-3 font-semibold">강수확률 (%)</th>
            <th className="py-3 font-semibold">산책지수</th>
          </tr>
          </thead>

          <tbody>
          {walkScores.map((item) => {
            const dateInKST = new Date(item.weatherDetail.time);
            const day = dateInKST.getDate();
            const hour = dateInKST.getHours();

            return (
              <tr key={item.weatherDetail.time} className="text-center text-xs font-bold border-t border-zinc-700">
                <td className="py-2">{`${day}일 ${hour}시`}</td>
                <td className="py-2">{item.weatherDetail.condition}</td>
                <td className="py-2">{item.weatherDetail.temperature.toFixed(1)}</td>
                <td className="py-2">{(item.weatherDetail.precipitationProbability * 100).toFixed(0)}</td>
                <td className="py-2">{item.walkScore}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
