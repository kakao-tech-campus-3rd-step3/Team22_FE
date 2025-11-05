import useLocation from '@/hooks/useLocation.ts'
import LoadingBox from './LoadingBox'
import useWeatherScore from '@/hooks/useWeatherScore.ts'
import veryGood from '@/assets/walkingIcons/very_good_line.svg'
import good from '@/assets/walkingIcons/good_line.svg'
import neutral from '@/assets/walkingIcons/neutral_line.svg'
import bad from '@/assets/walkingIcons/bad_line.svg'
import veryBad from '@/assets/walkingIcons/very_bad_line.svg'
import { BAD, GOOD, NEUTRAL, VERY_GOOD } from '@/constants/walkingScore.ts'
import clearNight from '@/assets/weatherIcons/clear_night.svg'
import clearDay from '@/assets/weatherIcons/clear_day.svg'
import cloudyDay from '@/assets/weatherIcons/cloudy_day.svg'
import cloudyNight from '@/assets/weatherIcons/cloudy_night.svg'
import rainyDay from '@/assets/weatherIcons/rainy_day.svg'
import rainyNight from '@/assets/weatherIcons/rainy_night.svg'
import snowyDay from '@/assets/weatherIcons/snowy_day.svg'
import snowyNight from '@/assets/weatherIcons/snowy_night.svg'
import windDay from '@/assets/weatherIcons/wind_day.svg'
import windNight from '@/assets/weatherIcons/wind_night.svg'

export default function WeatherTable() {
  const { initialLocation, status } = useLocation()
  const {
    data: walkScores,
    isLoading: walkScoresLoading,
    isError: walkScoresError,
  } = useWeatherScore({ initialLocation })

  if (walkScoresLoading || status === 'loading') return <LoadingBox hsize="72" />

  if (status === 'denied') {
    return <div className="text-center text-red-500 font-bold p-4">위치 권한을 허용해주세요.</div>
  }

  if (walkScoresError || !walkScores) {
    return <div>날씨 정보를 불러올 수 없습니다.</div>
  }

  const handleWalkingIcons = (scores: number) => {
    if (scores > VERY_GOOD) {
      return <img src={veryGood} alt="very Good Walking" className="mx-auto" />
    } else if (scores >= GOOD) {
      return <img src={good} alt="very Good Walking" className="mx-auto" />
    } else if (scores >= NEUTRAL) {
      return <img src={neutral} alt="very Good Walking" className="mx-auto" />
    } else if (scores >= BAD) {
      return <img src={bad} alt="very Good Walking" className="mx-auto" />
    } else {
      return <img src={veryBad} alt="very Good Walking" className="mx-auto" />
    }
  }

  const handleWeatherIcons = (weather: string) => {
    if (weather.includes('NIGHT')) {
      if (weather.includes('CLEAR')) {
        return <img src={clearNight} alt="clear Night" className="mx-auto" />
      } else if (weather.includes('CLOUDY')) {
        return <img src={cloudyNight} alt="cloudy Night" className="mx-auto" />
      } else if (weather.includes('RAINY')) {
        return <img src={rainyNight} alt="rainy Night" className="mx-auto" />
      } else if (weather.includes('SNOWY')) {
        return <img src={snowyNight} alt="snowy Night" className="mx-auto" />
      } else if (weather.includes('WIND')) {
        return <img src={windNight} alt="wind Night" className="mx-auto" />
      }
    } else {
      if (weather.includes('CLEAR')) {
        return <img src={clearDay} alt="clear Day" className="mx-auto" />
      } else if (weather.includes('CLOUDY')) {
        return <img src={cloudyDay} alt="cloudy Day" className="mx-auto" />
      } else if (weather.includes('RAINY')) {
        return <img src={rainyDay} alt="rainy Day" className="mx-auto" />
      } else if (weather.includes('SNOWY')) {
        return <img src={snowyDay} alt="snowy Day" className="mx-auto" />
      } else if (weather.includes('WIND')) {
        return <img src={windDay} alt="wind Day" className="mx-auto" />
      }
    }
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
              const dateInKST = new Date(item.weatherDetail.time)
              const day = dateInKST.getDate()
              const hour = dateInKST.getHours()

              return (
                <tr
                  key={item.weatherDetail.time}
                  className="text-center text-xs font-bold border-t border-zinc-700"
                >
                  <td className="py-2">{`${day}일 ${hour}시`}</td>
                  <td className="py-2">{handleWeatherIcons(item.weatherDetail.condition)}</td>
                  <td className="py-2">{item.weatherDetail.temperature.toFixed(1)}</td>
                  <td className="py-2">
                    {(item.weatherDetail.precipitationProbability * 100).toFixed(0)}
                  </td>
                  <td className="py-2">{handleWalkingIcons(item.walkScore)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
