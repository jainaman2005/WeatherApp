export const WeatherIcon = ({ iconCode ,style}: { iconCode: string ,style: string }) => {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return <img src={iconUrl} alt="Weather icon" className= {style}/>;
}