import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useOpenWeather(props: {
  location: {
    latitude: number;
    longitude: number;
  } | null;
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    if (!props.location) return;
    const { latitude, longitude } = props.location;

    const fetchWeather = async () => {
      try {
        const url =
          `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric&lang=kr`
        const response = await axios.get(url);
        const data = response.data;
        setWeather(data);
      } catch (e) {
        setWeather(null);
        console.error("날씨 정보 fetching 실패: ", e);
      }
    }

    fetchWeather();
  }, [props.location]);

  return { weather };
}
