export interface WeatherData {
  name: string; // City name
  main: {
    temp: number; // Temperature in °C (if units=metric)
    humidity: number; // Humidity %
  };
  weather: {
    description: string; // e.g., "clear sky"
    icon: string; // icon code like "01d"
  }[];
  wind: {
    speed: number; // wind speed in m/s
  };
  sys: {
    sunrise: number; // unix timestamp
    sunset: number; // unix timestamp
  };
}
