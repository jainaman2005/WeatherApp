import { useState } from "react";
import { SearchBar } from "./SearchBar";
export const Search = (props: { updateError: (message: string) => void, updateLocation: (val: GeoCity) => void }) => {
    const handleUpdateTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "morning";
        if (hour >= 12 && hour < 17) return "afternoon";
        if (hour >= 17 && hour < 21) return "evening";
        if (hour >= 21 || hour < 1) return "night";
        return "midnight";

    }
    const handleClick = (option: GeoCity) => {
        const newLocation: GeoCity = {
            name: option.name,
            lat: option.lat,
            lon: option.lon,
            state: option?.state,
            country: option.country
        };
        props.updateLocation(newLocation);
        setOptions([]);
        props.updateError("");
        console.log(option.name, ",lat:", option.lat, ",lon:", option.lat);
    }
    function createCityList() {
        return options.map((option, index) => {
            return <li className="cursor-pointer flex items-center p-2  border-b border-b-slate-600" key={index} onClick={() => handleClick(option)}>
                {`${[option.name, option?.state ,option.country].join(" ,")}`}
            </li>
        })
    }
    const [options, setOptions] = useState<GeoCity[]>([]);
    return (
        <div className="w-full flex flex-col md:flex-row p-2 md:items-center text-md gap-1 md:px-10 md:justify-between z-0">
            <div className="flex flex-col md:text-lg flex-1/2 font-semibold gap-0.5 self-start">
                <a className="" href={`https://www.google.com/search?q=date`} target="_blank">{new Date().toDateString()}</a>
                <a href={`https://www.google.com/search?q=${handleUpdateTimeOfDay()}`}
                    target="_blank" className="">{`Good ${handleUpdateTimeOfDay()}`}</a>
            </div>
            <div className="flex flex-col items-center flex-1/2 gap-0.5">
                <div className="w-full flex items-center shadow-md rounded-2xl border-y-2 border-gray-800  gap-2">
                    <div className="p-1.5 bg-slate-900 flex items-center">
                        <i className="icon-[material-symbols-light--search-rounded] text-xl"></i>
                    </div>
                    <SearchBar setOptions={setOptions} updateError={props.updateError} />
                </div>
                <div className="relative w-full ">
                    <ul className="w-full absolute bg-gray-900 rounded-md">
                        {options && createCityList()}
                    </ul>
                </div>
            </div>
        </div>

    )
}