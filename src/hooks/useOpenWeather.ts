import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useOpenWeather(props: {
  location: {
    latitude: number
    longitude: number
  }
}) {
  const { location } = props
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!location) return
    const { latitude, longitude } = location

    const fetchWeather = async () => {
      setLoading(true)
      setError(null)

      try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric&lang=kr`
        const response = await axios.get(url)
        const data = response.data
        setWeather(data)
      } catch {
        setWeather(null)
        setError('날씨 정보 불러오는 데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [location])

  return { weather, loading, error }
}
