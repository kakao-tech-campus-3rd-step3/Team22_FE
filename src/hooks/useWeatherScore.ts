import { useQuery } from '@tanstack/react-query'
import { getWeather } from '@/api/weather.ts'

type HourlyForecast = {
  weatherDetail: {
    time: string;
    condition: string;
    temperature: number;
    humidity: number;
    precipitationProbability: number;
    windSpeed: number;
    windDegree: number;
  };
  walkScore: number;
};

export default function useWeatherScore(props: { initialLocation: { latitude: number; longitude: number } | null }) {
  const { initialLocation } = props;
  const { latitude, longitude } = props.initialLocation ?? {};

  return useQuery<HourlyForecast[]> ({
    queryKey: ['weatherScore', latitude, longitude],
    queryFn: async () => {
      const response = await getWeather(latitude!, longitude!)
      return response.data.hourlyForecasts
    },
    staleTime: 1000 * 6 * 5,
    enabled: !!initialLocation,
  })
}
