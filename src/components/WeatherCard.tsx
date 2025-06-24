import { getTimeByTimezoneOffset } from "../utilities/utility"
import { CurrWeatherDisplay } from "./ui/CurrWeatherDisplay"
import { OptionalDetails } from "./ui/optionalDetails"
import { DailyForecast } from "./ui/DailyForecast"
import { AirQuality } from "./ui/AirQuality"
import { useEffect, useState } from "react";
import { HourlyForecast } from "./hourlyForecast"
import{ fetchAirQuality } from "../api/weather"
export function WeatherCard({ weatherData, handleError }: { weatherData: WeatherResponse, handleError: (x :string) => void}){
    const [city, setCity] = useState<City>(weatherData.city);
    const [date, setDate] = useState<Date>(getTimeByTimezoneOffset(city.timezone));
    const [currWeatherData, setCurrWeatherData] = useState<WeatherItem | null>(null);
    const [minmaxTemp, setMinMaxTemp] = useState<{ min: number, max: number }>({ min: -Infinity, max: Infinity });
    const [airQuality,setAirQuality] = useState<AirQualityResponse | null>(null);
    //update data of the city and time when weatherData change:
    useEffect(() => {
        const updateCityinfo = () => {
            setCity(weatherData.city);
            const now = getTimeByTimezoneOffset(weatherData.city.timezone);
            setDate(now);
            console.log(now);
            console.log(weatherData.city.name, weatherData.city.timezone);
        }
        updateCityinfo();
    }, [weatherData]);

    //update the time:
    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = getTimeByTimezoneOffset(city.timezone);
            setDate(now);
            console.log(now);
        }, (60 - date.getSeconds()) * 1000 + 1000 - date.getMilliseconds());
        return () => clearInterval(intervalId);
    }, [city, date]);

    //update curr weather data:
    useEffect(() => {
        const updateCurrWeather = () => {
            handleError("");
            const weatherItems = weatherData?.list;
            const currentWeather: WeatherItem | undefined = weatherItems.find((item) => {
                const itemDate = new Date(item.dt_txt);
                return itemDate.getFullYear() === date.getFullYear() &&
                    itemDate.getMonth() === date.getMonth() &&
                    itemDate.getDate() === date.getDate() &&
                    itemDate.getHours() === date.getHours();
            })
            if (currentWeather) {
                setCurrWeatherData(currentWeather);
            }
            else {
                handleError("Error to fetch Current Weather Information.");
                setCurrWeatherData(null);
            }
            console.log(currentWeather);
        }
        updateCurrWeather();
    }, [date, handleError, weatherData]);
    //air Quality Fetch:
    useEffect(()=>{
        const fetchAirQualityData = async ()=>{
            try{
                const response = await fetchAirQuality(weatherData.city.coord.lat,weatherData.city.coord.lon);
                const data : AirQualityResponse = response.data as AirQualityResponse;
                setAirQuality(data);
                console.log("Air Quailty")
                console.log(response.data)
            }catch(err){
                console.error("Error Fetching AQI: ",err);
                handleError("Error fetching AQI");
            }
        }
        fetchAirQualityData();
    },[handleError, weatherData])

    return (
        <>
            {currWeatherData &&
                (<div className="*:p-1 box-border grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 xl:gap-7 md:grid-rows-[auto_auto_1fr_auto] *:shadow-md mx-1">
                    {/* Display Current Weather Details */}
                    <CurrWeatherDisplay city={city} minmaxTemp={minmaxTemp} currentWeatherData={currWeatherData} dateNow={date} />
                    <HourlyForecast hourlyData={weatherData.list} timeNow={date} />

                    {/* Daily Forecast for the next 7 days */}

                    <div className="flex flex-col  justify-between gap-2 md:col-start-2 md:row-start-1 md:row-span-2 shadow-xl rounded-lg">
                        <DailyForecast city={city} cnt={7} setCurrMinMax={setMinMaxTemp} dateNow={date} />
                    </div>

                    {/* Optionals Details */}
                    <OptionalDetails coord={weatherData.city.coord} currWeather={currWeatherData} />

                    {/*AIR Pollution */}
                    {airQuality && <AirQuality aqi={airQuality} date={date}/>}
                </div>)}

        </>
    )
}