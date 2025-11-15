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

interface WeatherDaily {
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  humidity: number;
}

interface Wind {
  speed: number;
}

export interface WeatherDailyResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDataDaily[];
}

export interface WeatherDataDaily {
  main: Main;
  weather: WeatherDaily[];
  wind: Wind;
  dt_txt: string;
}
