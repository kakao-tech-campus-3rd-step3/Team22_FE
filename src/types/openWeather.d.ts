interface ForecastItem {
  dt_txt: string;
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
  };
  pop: number;
}

interface WeatherData {
  list: ForecastItem[];
}
