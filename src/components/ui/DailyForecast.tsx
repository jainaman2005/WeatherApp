import { fetchForecastDailyFuture } from "../../api/weather";
import { useState, useEffect } from 'react';
import { WeatherIcon } from "./weatherIcon";
export function DailyForecast({ city, cnt, setCurrMinMax, dateNow }: { city: City, cnt: number, setCurrMinMax: React.Dispatch<React.SetStateAction<{ min: number, max: number }>>, dateNow: Date }) {
    const [dailyForecast, setDailyForecast] = useState<WeatherForecastResponse | null>(null);
    useEffect(() => {
        const fetchDailyWeatherData = async () => {
            try {
                const res = await fetchForecastDailyFuture(city.name, cnt);
                console.log(res.data);
                setDailyForecast(res.data);
                const todayEntry = res.data.list.find((entry: DailyWeather) => (new Date().getDate() === new Date(entry.dt * 1000).getDate()));
                if (todayEntry) {
                    console.log(todayEntry);
                    setCurrMinMax({ min: todayEntry.temp.min.toFixed(0), max: todayEntry.temp.max.toFixed(0) });
                    console.log(todayEntry);
                }
            } catch (err) {
                setCurrMinMax({ min: -Infinity, max: Infinity });
                console.error("Error fetching the daily Forecast: ", err);
            }
        }
        fetchDailyWeatherData();
    }, [city, cnt, setCurrMinMax]);
    function getDayLabel(date: Date): string {
        const d1 = new Date(date);
        const d2 = new Date(dateNow);
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);

        const diffInTime = d1.getTime() - d2.getTime();
        const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

        if (diffInDays === 0) return "Today";
        if (diffInDays === 1) return "Tomorrow";
        if (diffInDays === -1) return "Yesterday";

        return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
    function createListOfForecast() {
        const list = dailyForecast?.list;
        if (list) {
            return list.map((entry: DailyWeather) => {
                const date = new Date(entry.dt * 1000);
                const day = getDayLabel(date);
                const dateStr = date.toLocaleDateString('en-US', { day: "numeric", month: 'numeric', });
                const temp = {
                    min: entry.temp.min.toFixed(0),
                    max: entry.temp.max.toFixed(0)
                };
                return (
                    <div key={entry.dt} className={`flex items-center justify-between text-sm  font-semibold transform scale-90 border-b-sky-950 border-b-1 sm:flex-1/7 ${day === "Today" ? "scale-95 bg-[#1132558e] shadow-sm rounded-lg px-2 lg:text-[1rem]" : ""} px-1`}>
                        <div className="flex items-center gap-2 w-1/3">
                            <span className=" text-gray-50">{dateStr}</span>
                            <span className="text-gray-400 self-start">{day}</span>
                        </div>
                        <div className="flex items-center  w-1/3">
                            <WeatherIcon iconCode={entry.weather[0].icon} style={"w-8  lg:h-12 lg:w-12 object-contain"} />
                            <span className="hidden md:inline text-slate-500">{entry.weather[0].main}</span>
                        </div>
                        <div className="space-x-3">
                            <span className="text-gray-500">{temp.min}</span>
                            <span>{temp.max}</span>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className="p-1 h-full flex-col flex items-center *:w-full gap-1.5">
            <h2 className="hidden sm:inline font-semibold text-[#f8e57a] text-xl text-center ">7 Days Forecast</h2>
            <div className="flex flex-col max-h-30 md:max-h-full md:h-full overflow-y-scroll overflow-x-hidden no-scrollbar">
                {dailyForecast && createListOfForecast()}
            </div>
        </div>
    );
}