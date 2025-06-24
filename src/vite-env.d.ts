/// <reference types="vite/client" />
interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherItem[];
  city: City;
}

interface WeatherItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  "1h": number;
}

interface Sys {
  pod: string;
}

interface City {
  id : number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise?: number;
  sunset?: number;
}

interface Coord {
  lat: number;
  lon: number;
}

interface WeatherForecastResponse {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: DailyWeather[];
}


interface DailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain?: number;
}

interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}
interface GeoCity{
  name : string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
//Air Quality Interfaces :
interface AirQualityComponent {
  co: number;
  no: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  nh3: number;
}

interface AirQualityMain {
  aqi: number;
}

interface AirQualityEntry {
  dt: number;
  main: AirQualityMain;
  components: AirQualityComponent;
}

interface AirQualityResponse {
  coord: Coord;
  list: AirQualityEntry[];
}
