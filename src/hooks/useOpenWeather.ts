import { useEffect, useState } from 'react'

export default function useOpenWeather(props: {
  location: {
    latitude: number
    longitude: number
  } | null
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.location === null) return
    const { latitude, longitude } = props.location

    const fetchWeather = async () => {
      setLoading(true)
      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric&lang=kr` //UI 테스트용
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setWeather(data)
      } catch (e) {
        setWeather(null)
        console.error('날씨 정보 fetching 실패:', e)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [props.location])

  return { weather, loading }
}
