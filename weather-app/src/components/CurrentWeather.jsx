import dayjs from "dayjs";

import WeatherIcon from "../util/WeatherIcon";
export default function CurrentWeather({ cweather }) {
  console.log(cweather.weather)
  return (
    <div className="content-center bg-sky-500 flex flex-row w-full">
      <div className="flex flex-col grow basis-1/3">
        <p>{dayjs(cweather.dt * 1000).format("MMM DD")}</p>
        <p>{cweather.name}</p>
        <div className="">
          <p>{cweather.weather[0].description}</p>
        <p>{"Temperature: " + cweather.main.temp}</p>
        </div>
        
      </div>

      <div className="flex flex-row grow basis-1/3">
        <WeatherIcon icontype={cweather.weather[0].icon} className=" flex grow " />
      </div>
      <div className="flex flex-row grow basis-1/3">
        <div className="flex flex-col grow basis-1/2">
          <p>Feels Like:</p>
          <p>Visibility:</p>
          <p>Humidity%: </p>
          <p>Wind Speed:</p>
          <WeatherIcon icontype={"sunrise"} className="size-[23vh] flex-shrink"/>
          <p className="text-center">
            {dayjs(cweather.sys.sunrise * 1000).format("HH:mm")}
          </p>
        </div>
        <div className="flex flex-col grow basis-1/2">
          <p>{cweather.main.feels_like}</p>
          <p>{Math.round(cweather.visibility / 1000) + " km"}</p>
          <p>{cweather.main.humidity}</p>
          <p>{" " + (cweather.wind.speed * 3.6).toFixed(2) + " km/h"}</p>
          <WeatherIcon icontype={"sunset"} className="size-[23vh] flex-shrink"/>
          <p className="text-center">
            {dayjs(cweather.sys.sunset * 1000).format("HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
}
