import InfoRow from '@/components/common/InfoRow'
import WeatherTable from '@/components/common/WeatherTable'
import useAuthStore from '@/stores/authStore'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, type RefObject } from 'react'
import { useSetupStore } from '@/stores/setupStore'
import { useUIStore } from '@/stores/uiStore'
import useKakaoStaticMap from '@/hooks/useKakaoStaticMap'
import { useMapSetupStore } from '@/hooks/useMapSetupStore'
import useKakaoMapLoader from '@/hooks/useKakaoMapLoader'
import useLocation from '@/hooks/useLocation.ts'
import useWeatherScore from '@/hooks/useWeatherScore.ts'
import LoadingBox from '@/components/common/LoadingBox'
import { VERY_GOOD, GOOD, NEUTRAL, BAD } from '@/constants/walkingScore.ts'

function WalkRecommendation(props: { score: number; temperature: number; precipProb: number }) {
  const { score, temperature, precipProb } = props

  let recommendation
  if (score > VERY_GOOD) {
    recommendation = {
      icon: '🐶',
      text: '지금 산책 최적!',
      small: `${temperature.toFixed(1)}°C, 맑고 쾌적합니다.`,
      color: 'bg-blue-600',
    }
  } else if (score >= GOOD) {
    recommendation = {
      icon: '🌤️',
      text: '산책 하기 좋음',
      small: `${temperature.toFixed(1)}°C, 쾌적한 날씨`,
      color: 'bg-green-500',
    }
  } else if (score >= NEUTRAL) {
    recommendation = {
      icon: '🌦️',
      text: '잠시 후 비 예보',
      small: `강수확률 ${(precipProb * 100).toFixed(0)}%, 짧은 산책 권장`,
      color: 'bg-yellow-400',
    }
  } else if (score >= BAD) {
    recommendation = {
      icon: '🌧️',
      text: '산책 비추천',
      small: `강수로 부적합, 실내 활동 권장`,
      color: 'bg-red-500',
    }
  } else {
    recommendation = {
      icon: '⛈️',
      text: '산책 매우 부적합',
      small: '악천후로 인한 위험',
      color: 'bg-red-700',
    }
  }

  return (
    <div
      className={`rounded-xl shadow-lg p-5 flex flex-col items-center gap-1 ${recommendation.color}`}
    >
      <span className="text-3xl">{recommendation.icon}</span>
      <span className="font-bold text-lg">{recommendation.text}</span>
      <span className="text-xs text-gray-100">{recommendation.small}</span>
    </div>
  )
}

function WeatherTimelineBar({
  data,
}: {
  data: { hour: number; icon: string; level: number; temp: number }[]
}) {
  return (
    <div className="flex gap-2 w-full overflow-x-auto p-2">
      {data.map((d, i) => (
        <div className="flex flex-col items-center min-w-[56px]" key={i}>
          <span className="text-xs">{d.hour}시</span>
          <span className="text-xl">{d.icon}</span>
          <span className="text-xs mt-1">{d.temp}°C</span>
          <div
            className={`h-2 w-8 rounded-full mt-1 ${
              ['bg-blue-400', 'bg-yellow-300', 'bg-red-400'][d.level]
            }`}
          ></div>
        </div>
      ))}
    </div>
  )
}

function WalkStartButton(props: { bestTime: string }) {
  const { bestTime } = props
  return (
    <button className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow hover:bg-indigo-700 transition">
      {bestTime ? `${bestTime}에 산책 추천` : '지금 산책 시작하기'}
    </button>
  )
}

function MapWithRouteMarkers(props: { mapContainerRef: RefObject<HTMLDivElement | null> }) {
  const { mapContainerRef } = props

  return <div ref={mapContainerRef} className="w-full rounded-xl h-72" />
}

export default function MainPage() {
  const username = useAuthStore((state) => state.username)
  const navigate = useNavigate()
  const isAllDone = useSetupStore(
    (s) => s.isPetSettingDone && s.isLocationSettingDone && s.isRouteDrawDone,
  )
  const setShowNavbar = useUIStore((state) => state.setShowNavbar)
  const loaded = useKakaoMapLoader()
  const { latitude, longitude } = useMapSetupStore()
  const { mapContainerRef } = useKakaoStaticMap({ latitude, longitude, loaded })

  const { initialLocation, status } = useLocation()
  const {
    data: walkScores,
    isLoading: walkScoresLoading,
    isError: walkScoresError,
  } = useWeatherScore({ initialLocation })

  useEffect(() => {
    if (isAllDone === false) {
      navigate({ to: '/intro' })
    }
    setShowNavbar(true)
  }, [isAllDone, navigate, setShowNavbar])

  if (walkScoresLoading || status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
        <LoadingBox hsize="72" />
      </div>
    )
  }

  if (status === 'denied') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
        <div className="text-center text-red-500 font-bold p-4">위치 권한을 허용해주세요.</div>
      </div>
    )
  }

  if (walkScoresError || !walkScores || walkScores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900">
        <div className="text-center text-red-500 font-bold p-4">
          날씨 정보를 불러올 수 없습니다.
        </div>
      </div>
    )
  }

  const currentWeather = walkScores[0]

  const timelineData = walkScores.slice(0, 6).map((item) => {
    const dateInKST = new Date(item.weatherDetail.time)
    const hour = dateInKST.getHours()

    let icon = '☀️'
    const condition = item.weatherDetail.condition
    if (condition.includes('CLEAR')) {
      icon = condition.includes('NIGHT') ? '🌙' : '☀️'
    } else if (condition.includes('CLOUDY')) {
      icon = '⛅'
    } else if (condition.includes('RAINY')) {
      icon = '🌧️'
    } else if (condition.includes('SNOWY')) {
      icon = '❄️'
    } else if (condition.includes('WIND')) {
      icon = '💨'
    }

    let level = 4
    if (item.walkScore > VERY_GOOD) {
      level = 0
    } else if (item.walkScore > GOOD) {
      level = 1
    } else if (item.walkScore > NEUTRAL) {
      level = 2
    } else if (item.walkScore > BAD) {
      level = 3
    } else {
      level = 4
    }

    return {
      hour,
      icon,
      level,
      temp: Math.round(item.weatherDetail.temperature),
    }
  })

  const bestWalkData = walkScores.slice(0, 12).reduce((best, current) => {
    return current.walkScore > best.walkScore ? current : best
  }, walkScores[0])

  const bestWalkHour = new Date(bestWalkData.weatherDetail.time).getHours()
  const bestWalkTime = `${bestWalkHour}시`

  return (
    <div className="flex flex-col items-stretch min-h-screen bg-neutral-900">
      <div className="flex flex-col w-full max-w-screen-sm mx-auto gap-6 p-4">
        <InfoRow label="">
          <div className="bg-neutral-800 rounded-lg shadow-xl p-6 w-full">
            <span className="text-white font-bold text-lg">{username}님의 산책 정보</span>
          </div>
        </InfoRow>

        <WalkRecommendation
          score={currentWeather.walkScore}
          temperature={currentWeather.weatherDetail.temperature}
          precipProb={currentWeather.weatherDetail.precipitationProbability}
        />

        <WeatherTimelineBar data={timelineData} />

        <WalkStartButton bestTime={bestWalkTime} />

        <MapWithRouteMarkers mapContainerRef={mapContainerRef} />

        <details className="w-full max-w-lg bg-zinc-800 rounded-lg overflow-hidden mt-3">
          <summary className="py-2 px-4 cursor-pointer font-bold select-none text-center text-white">
            상세 예보 펼치기
          </summary>
          <WeatherTable />
        </details>
      </div>
    </div>
  )
}
