import './App.css';
import { useState, useEffect } from 'react'
import { Search } from './components/Search/Search'
import { WeatherInfoDisplay } from './components/WeatherInfoDisplay'
import { ErrorComponent } from "./components/ui/ErrorComponent";
import { fetchGeoLocation } from './api/weather';

function App() {
  const [location, setLocation] = useState<GeoCity | null>(null);
  const [error, setError] = useState<string>("");
  //to get the city via the longitude and lalitude:
  async function handleFetchGeoCity(lat: number,lon: number){
    try{
      const response = await fetchGeoLocation(lon,lat);
      console.log(response.data);
      const city : GeoCity = response.data[0];
      setLocation(city);
    }catch(err){
      console.error("Error:",err)
      setError("Geolocation Error Mapping");
    }
  }
  //to fetch current geolocation cordinates :
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleFetchGeoCity(
          Number(position.coords.latitude.toFixed(4)),
          Number(position.coords.longitude.toFixed(4))
        );
        console.log(position.coords);
      },
      (err) => {
        setError(`Geolocation error: ${err.message}`);
      },{
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);
  //handle error updates
  function handleErrorUpdate(message: string) : void{
    setError(message);
  }
  //handle the Location Update
  function handleLocationUpdate(val : GeoCity): void{
    setLocation(val);
  }

  return (
    < >
      <header>
        <div className="text-2xl md:text-4xl font-bold text-amber-300 px-1.5 py-4">Weather  <span className='text-blue-300'>Now</span></div>
      </header>
      <Search updateLocation = {handleLocationUpdate} updateError = {handleErrorUpdate}/>
      <main className='p-2 md:p-4'>
        {error && <ErrorComponent error = {error} setErr = {setError} />}
        {location && <WeatherInfoDisplay location={location} handleError={handleErrorUpdate} />}
      </main>
    </>
  )
}

export default App
