import { useEffect, useState } from "react";
import { getOverallAQI } from "../../utilities/utility"
export function AirQuality(props: { aqi: AirQualityResponse | null; date: Date }) {
  const [overallAQI,setOverallAQI] = useState<{aqi : number, level : string,details : Record<string, number> }| null>(null);
  useEffect(() => {
    if (!props.aqi || !props.aqi.list?.length) {
      console.warn("AirQuality data is empty.");
      return;
    }
    const data  = props.aqi.list[0];
    setOverallAQI(getOverallAQI(data.components));
  }, [props.aqi]);
  return (
    <div className="bg-[#031125be] rounded-2xl p-2">
      {overallAQI && (
        <div className="box-border p-2 flex flex-col gap-5 ">
          <p className="text-lg font-semibold sm:text-2xl">AQI: {overallAQI.aqi} <span className="text-sm sm:text-lg text-neutral-400 text-shadow-2xs">{overallAQI.level}</span></p>
          <div className="grid grid-cols-3 gap-y-5 gap-x-1">
            <div className="flex flex-col  gap-0.5 items-center text-xs text-gray-400 shadow-lg py-2 rounded-lg sm:text-sm">
              <span >PM2.5</span>
              <span className ="text-sm sm:text-lg  text-white font-semibold">{overallAQI.details.pm2_5}</span>
            </div>
            <div className="flex flex-col  gap-0.5 items-center text-xs text-gray-400 shadow-lg py-2 rounded-lg sm:text-sm">
              <span>PM10</span>
              <span className ="text-sm sm:text-lg  text-white font-semibold"> {overallAQI.details.pm10}</span>
            </div>
            <div className="flex flex-col  gap-0.5 items-center text-xs text-gray-400 shadow-lg py-2 rounded-lg sm:text-sm">
              <span>Ozone (O<sub>3</sub>)</span>
              <span className ="text-sm sm:text-lg  text-white font-semibold">{overallAQI.details.o3}</span>
            </div>
            <div className="flex flex-col  gap-0.5 items-center text-xs text-gray-400 shadow-lg py-2 rounded-lg sm:text-sm">
              <span>NO<sub>2</sub></span>
              <span className ="text-sm sm:text-lg  text-white font-semibold">{overallAQI.details.no2}</span>
            </div>
            <div className="flex flex-col  gap-0.5 items-center text-xs text-gray-400 shadow-lg py-2 rounded-lg sm:text-sm">
              <span>SO<sub>2</sub></span>
              <span className ="text-sm sm:text-lg  text-white font-semibold">{overallAQI.details.so2}</span>
            </div>
            <div className="flex flex-col  gap-0.5 items-center text-xs text-gray-400 shadow-lg py-2 rounded-lg sm:text-sm">
              <span>CO</span>
              <span className ="text-sm sm:text-lg  text-white font-semibold">{overallAQI.details.co}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
