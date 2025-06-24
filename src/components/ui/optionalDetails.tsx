import { useState, useEffect } from 'react';
import { fetchUVInd } from "../../api/weather"
interface AddInfo {
    uv: number; 
    wind_speed: number; 
    humidity: number; 
    visibility: number; 
    feelsTemp: number; 
    pressure: number;
}
export function OptionalDetails({ coord, currWeather }: { coord: Coord, currWeather: WeatherItem }) {
    const [additionalInfo, setAdditionalInfo] = useState<AddInfo>({ uv: 0, wind_speed: currWeather.wind.speed, humidity: currWeather.main.humidity, visibility: currWeather.visibility, feelsTemp: currWeather.main.feels_like, pressure: currWeather.main.pressure })
    useEffect(() => {
        const updateadditionalInfo = () => {
            setAdditionalInfo(prev => ({ ...prev, wind_speed: currWeather.wind.speed, humidity: currWeather.main.humidity, visibility: currWeather.visibility, feelsTemp: currWeather.main.feels_like, pressure: currWeather.main.pressure }))
        }
        const fetchUV = async () => {
            try {
                const response = await fetchUVInd(coord.lon, coord.lat);
                console.log(response.data?.value);
                setAdditionalInfo(prev => ({ ...prev, uv: response.data.value }));
            } catch (err) {
                console.error("Error to fetch UV ind:", err)
            }
        }
        updateadditionalInfo();
        fetchUV();
    }, [coord, currWeather]);
    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 bg-[#1a2f4dbb] sm:bg-[#253141ce] md:bg-[#102a43fa] rounded-xl  p-1 *:text-sm  sm:*:text-lg md:*:text-xl">
            <div className=" flex flex-col *:first:text-xl items-center text-sky-400 p-2 gap-2 ">
                <i className='icon-[carbon--temperature-feels-like]  font-bold'></i>
                <div className="text-gray-400 text-xs">Feels like</div>
                <div className='font-bold text-[#E0E1DD]'>{additionalInfo.feelsTemp.toFixed(0)}°C</div>
            </div>
            <div className="  flex flex-col *:first:text-xl items-center  text-sky-400 p-2 gap-2">
                <i className='icon-[lets-icons--humidity]  font-bold'></i>
                <div className="text-gray-400 text-xs ">humidity</div>
                <div className='font-bold text-[#E0E1DD]'>{additionalInfo.humidity}%</div>
            </div>
            <div className=" flex flex-col *:first:text-xl items-center  text-sky-400 p-2 gap-2">
                <i className="icon-[mdi--uv-ray-outline]  font-bold"></i>
                <div className="text-gray-400 text-xs ">UV</div>
                <div className='font-bold text-[#E0E1DD]'>{additionalInfo.uv}</div>
            </div>
            <div className=" flex flex-col *:first:text-xl items-center  text-sky-400 p-2 gap-2">
                <i className="icon-[mdi--visibility]  font-bold"></i>
                <div className="text-gray-400 text-xs  ">visibility</div>
                <div className='font-bold text-[#E0E1DD]'>{Math.round(additionalInfo.visibility / 1000)} km</div>
            </div>
            <div className=" flex flex-col *:first:text-xl items-center  text-sky-400 p-2 gap-2">
                <i className="icon-[svg-spinners--wind-toy]  font-bold "></i>
                <div className="text-gray-400 text-xs  ">Wind</div>
                <div className='font-bold text-[#E0E1DD]'>{additionalInfo.wind_speed} ms<sup>-1</sup></div>
            </div>
            <div className=" flex flex-col *:first:text-xl items-center  text-sky-400 p-2 gap-2">
                <i className="icon-[lets-icons--pressure] font-bold  "></i>
                <div className="text-gray-400 text-xs   ">Pressure</div>
                <div className='font-bold text-[#E0E1DD]'>{additionalInfo.pressure} hPa</div>
            </div>
        </div>
    );
}