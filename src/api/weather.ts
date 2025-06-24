import axios, { type AxiosResponse } from 'axios';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY ;
const BASE_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5';
const GEO_BASE_URL = "http://api.openweathermap.org/geo/1.0";

export const fetchUVInd = (lon :number, lat:number) =>{
    return axios.get(`${BASE_URL}/uvi`,{
        params: {
            appid: API_KEY,
            lon: lon,
            lat:lat
        }
    })
}
//fetch Forecast for future Days(max_upto 16):
export function fetchForecast(cnt: number ,city : string , country_code : string) : Promise<AxiosResponse<unknown, unknown>>;
export function fetchForecast(cnt: number, lat: number, lon: number) : Promise<AxiosResponse<unknown, unknown>>;
export function fetchForecast(cnt : number, arg1: string| number , arg2 ?: string |number) : Promise<AxiosResponse<unknown, unknown>> {
    const count = (cnt > 0 && cnt < 17) ? cnt: 16;
    if(typeof arg1 === 'number' && typeof arg2 === 'number'){
        return axios.get(`${BASE_URL}/forecast/daily?lat=${arg1}&lon=${arg2}&cnt=${count}&appid=${API_KEY}&units=metric`)
    }else {
        return axios.get(`${BASE_URL}/forecast/daily?q=${arg1}&cnt=${count}&appid=${API_KEY}&units=metric`)
    }
}
export const fetchForecastDailyFuture = (city: string,cnt: number) => {
    return axios.get(`${BASE_URL}/forecast/daily?q=${city}&cnt=${cnt}&appid=${API_KEY}&units=metric`)
}

//houly Data upto 4 Days:
export function fetchHourlyForecast (lat: number, lon: number) :  Promise<AxiosResponse<unknown,unknown>>;
export function fetchHourlyForecast (city: string) :  Promise<AxiosResponse<unknown,unknown>>;
export function fetchHourlyForecast(arg1: string | number , arg2 ?: number) :   Promise<AxiosResponse<unknown,unknown>>{
    if(typeof arg1 === 'number' && typeof arg2 === 'number')
        return axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${arg1}&lon=${arg2}&appid=${API_KEY}&units=metric`);
    else 
        return axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${arg1}&appid=${API_KEY}&units=metric`);
}

//get the geolocation coordinates using the city name:
export const fetchGeoLocation = (lon : number, lat : number ) =>{
    return axios.get(`${GEO_BASE_URL}/reverse?lat=${lat}&lon=${lon}&limit=${1}&appid=${API_KEY}`);
}
//get the names of the city using the geolacation api for choice:
export function fetchSimilarCities(city : string, lmt : number)  : Promise<AxiosResponse<unknown,unknown>>{
    const limit = lmt;
    return axios.get(`${GEO_BASE_URL}/direct?q=${city}&limit=${limit}&appid=${API_KEY}`);
}
export function fetchAirQuality(lat : number, lon: number) : Promise<AxiosResponse<unknown,unknown>>{
    return axios.get(`${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
}