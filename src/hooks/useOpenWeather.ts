import { useEffect, useState } from 'react'

interface useOpenWeatherProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

export default function useOpenWeather({ location }: useOpenWeatherProps) {
  const [weather, setWeather] = useState(null);
  const [ , setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      setLoading(true);

      const url =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}&units=metric&lang=kr`
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data);
      } catch (e) {
        setWeather(null);
        console.error("날씨 정보 fetching 실패:", e);
      }
    }

    fetchWeather();
  }, [location]);

  return weather;
}
