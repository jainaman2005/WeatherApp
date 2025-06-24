import { WeatherIcon } from "./weatherIcon";
import { capitalizeWords,getGradientByHour } from "../../utilities/utility";
export function CurrWeatherDisplay({ city, dateNow, currentWeatherData, minmaxTemp }: { city: City, dateNow: Date, currentWeatherData: WeatherItem, minmaxTemp: { min: number, max: number } }) {
    return (
        <div className={` shadow-2xs flex flex-col flex-wrap lg:justify-between rounded-xl border border-neutral-700 *:px-2 mx-2 ${getGradientByHour(dateNow.getHours())}`}>
            {/* City info: */}
            <div className="flex items-center justify-between">
                <a href={`https://www.google.com/search?q=${city.name}`}
                    target="_blank" className="flex rounded-lg py-1 px-1.5 items-center text-lg md:text-xl font-bold gap-1   hover:shadow-sm hover:opacity-80">
                    <i className="icon-[hugeicons--location-04]"></i>
                    {/* from-sky-950  to-sky-800 */}
                    <span>{`${capitalizeWords(city.name)} ,${city.country}`}</span>
                </a>
                <div className="rounded-sm text-sm sm:text-lg flex flex-col ">
                    <span className="self-end">{`${String(dateNow.getHours()).padStart(2, '0')}:${String(dateNow.getMinutes()).padStart(2, '0')}`}</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center lg:gap-2 gap-0.5 sm:gap-4 ">
                <div className="text-7xl sm:text-5xl font-extrabold sm:font-semibold">
                    {(currentWeatherData.main.temp).toFixed(0)}
                    <span className="-top-7 sm:-top-4 relative text-slate-500 text-3xl font-bold sm:font-semibold">°C</span>
                </div>
                <WeatherIcon iconCode={currentWeatherData.weather[0].icon} style={"w-35 sm:w-30 object-contain"} />
                <div className="flex flex-col items-center sm:items-start" >
                    <p className="text-center text-xl sm:text-lg text-gray-300">{currentWeatherData.weather[0].description}</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row text-gray-400 text-xl sm:text-lg items-center font-semibold justify-center sm:justify-between md:gap-2">
                <div>{`Feels like ${currentWeatherData.main.feels_like.toFixed(0)}°C`}</div>
                <div className="">{`${minmaxTemp.min} ~ ${minmaxTemp.max}°C`}</div>
            </div>
        </div>
    )
}