import { useState, useEffect } from "react";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";
import BriefWeather from "./components/BriefWeather";

function App() {
  const [weatherState, setWeatherState] = useState({});
  const [forecastState, setForecastState] = useState({});
  const [loadingState, setLoadingState] = useState(true);
  useEffect(() => {
    const apiKey = "0ef5bd5cd32428a03b62a94e1527968e";
    async function fetchWeather(lat, lon) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const weatherData = await response.json();
      //setWeatherState(weatherData)
      return weatherData;
    }
    async function fetchForecast(lat, lon) {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      const forecastData = await response.json();
      //setForecastState(forecastData)
      return forecastData;
    }
    try {
      setLoadingState(true);
      navigator.geolocation.getCurrentPosition(async (position) => {
        const weatherData = await fetchWeather(
          position.coords.latitude,
          position.coords.longitude
        );
        const forecastData = await fetchForecast(
          position.coords.latitude,
          position.coords.longitude
        );
        setWeatherState(weatherData);
        setForecastState(forecastData);
        setLoadingState(false);
      });
    } catch (error) {
      setLoadingState(false);
      console.error(error);
    }
  }, []);
  console.log(weatherState);
  //console.log(forecastState);
  if (loadingState) {
    return <p>Loading weather data....</p>;
  }
  const arr = [];
  for (let i = 1; i < 14; i++) {
    let ind = String(i).padStart(2, 0);
    arr.push(ind + "d");
    arr.push(ind + "n");
  }
  console.log(arr);
  // return (
  //   <div className=' bg-sky-300 font-medium min-h-screen lg:max-h-screen h-full flex justify-center items-center'>
  //     <div className=' flex flex-col lg:max-h-screen md:min-w-screen'  >
  //       <div className=' flex lg:flex-row md:flex-col flex-auto lg:basis-2/3'>
  //         <CurrentWeather cweather={weatherState} />
  //         <BriefWeather fcWeather={forecastState} />
  //       </div>
  //       <div className=' flex grow basis-1/3'>
  //         <Forecast fcWeather={forecastState} />
  //       </div>
  //     </div>
  //   </div>

  // )
  return (
    <div className="bg-sky-300 h-screen flex flex-col m-0 grow font-medium">
      <div className=" bg-red-500 flex flex-row grow basis-2/3">
        <div className="bg-sky-700 flex grow basis-2/3 rounded-lg m-2">
          <CurrentWeather cweather={weatherState}/>
        </div>
        <div className="bg-sky-700 flex grow basis-1/3 rounded-lg m-2">
          <BriefWeather fcWeather={forecastState} />
        </div>
      </div>
      <div className=" bg-yellow-400 flex grow flex-row basis-1/3 p-1 ">
        <Forecast fcWeather={forecastState} />
      </div>
    </div>
  );
}
//<ForecastWeather fcWeather={forecastState}/>
export default App;
