import { useEffect, useState } from 'react';
import { fetchHourlyForecast } from '../api/weather';
import { WeatherCard } from './WeatherCard';
export const WeatherInfoDisplay = ({ location ,handleError}: { location:  GeoCity ,handleError : (message: string) => void }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [hourlyWeatherData, setHourlyWeatherData] = useState<WeatherResponse | null>(null);
    //fetch hourly data:
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                console.log(location);
                const cityFullAddress : string = [location.name,location?.state,location.country].filter(Boolean).join(",");
                const response = await fetchHourlyForecast(location.lat,location.lon) || await fetchHourlyForecast(cityFullAddress);
                console.log(response.data);
                setHourlyWeatherData(response.data as WeatherResponse);
                handleError("");
            } catch (err) {
                const errMessage = err instanceof Error ? err.message : "Network Error" ;
                console.error("Error fetching hourly Weather data:", err)
                handleError(errMessage);
            } finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [location,handleError]);

    return (
        <>
            <div className="*:transition-all *:duration-500 ">
                {loading &&( 
                <div className=' flex items-center gap-2 relative top-10 place-self-center'>
                    <i className='icon-[eos-icons--bubble-loading] font-bold text-2xl sm:text-5xl text-sky-300 '></i>
                    <span>Loading</span>
                </div> )}
                {hourlyWeatherData && (
                    <WeatherCard weatherData={hourlyWeatherData}  handleError = {handleError}/>
                )}
            </div>
        </>
    )

}