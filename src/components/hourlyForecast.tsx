import { WeatherIcon } from './ui/weatherIcon';
export function HourlyForecast({ timeNow, hourlyData }: { timeNow: Date, hourlyData: WeatherItem[] }) {

    function createHourlyList() {
        if (hourlyData) {
            // const reduce
            const items = hourlyData.filter((_, i) => i % 2 == 0).slice(0, 12);
            return items.map((entry: WeatherItem) => {
                const temp = entry.main.temp.toFixed(0);
                const iconCode = entry.weather[0].icon;
                const onDate = new Date(entry.dt_txt);
                const dateDtr = (String(onDate.getMonth() + 1).padStart(2, '0') + "/" + String(onDate.getDate()).padStart(2, '0'));
                const timeStr = (String(onDate.getHours()).padStart(2, '0') + ":" + String(onDate.getMinutes()).padStart(2, '0'));
                const isNow = Math.abs(onDate.getTime() - timeNow.getTime()) <= 60 * 60 * 1000;

                return (
                    <div className={`box-border flex flex-col gap-1 items-center justify-center rounded-full shadow-sm shadow-sky-800 text-xs sm:text-sm  ${isNow ? "bg-[#1e46b3e5] scale-105 shadow-sky-950" : ""} font-mono p-3 sm:py-4`} key={entry.dt}>
                        <div className="">{`${temp}°C`}</div>
                        <WeatherIcon iconCode={iconCode} style={"w-fit sm:h-fit object-contain"} />
                        <div className="flex flex-col gap-0.5 items-center justify-center">
                            <span>{dateDtr}</span>
                            <span className={`${isNow ? "text-gray-300 font-semibold" : "hidden"}`}>{entry.weather[0].main}</span>
                            <span>{isNow ? "Now" : timeStr}</span>
                        </div>
                    </div>
                )
            })
        }
    }
    return (
        <div className="h-fit overflow-hidden flex  items-center justify-center px-1 sm:px-3">
            <div className="flex items-center overflow-x-scroll no-scrollbar transition-all duration-300 py-3 px-2 gap-2 md:gap-4">
                {hourlyData && (
                    createHourlyList()
                )}
            </div>
        </div>
    )
}