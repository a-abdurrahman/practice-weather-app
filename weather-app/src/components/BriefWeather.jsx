import { useState, useEffect } from "react";
import forecastWeather from "../util/ForecastWeather";
import dayjs from "dayjs";
import WeatherIcon from "../util/WeatherIcon";

const WeatherDisplay = ({ title, weatherData, ...props}) => {
    const [displayData, setDisplayData] = useState()
    useEffect(() => {
        const temps = []
        const conditions = []
        const icons = []
        let dayIcon
        let nightIcon
        weatherData.value.list.forEach((data, _) => {
            temps.push(data.main.temp)
            conditions.push(data.weather[0].main)
            icons.push(data.weather[0].icon)
            if (!dayIcon && data.sys.pod === 'd') {
                dayIcon = data.weather[0].icon
            }
            if (!nightIcon && data.sys.pod === 'n') {
                nightIcon = data.weather[0].icon
            }
        })
        // const dayIndex = weatherData.value.list.find(
        //     (elem) => elem.weather[0].icon.includes('d')
        // )
        // const dayIcon = dayIndex.weather[0].icon? dayIndex.weather[0].icon : '01d'
        // const nightIndex = weatherData.value.list.find(
        //     (elem) => elem.weather[0].icon.includes('n')
        // )
        // const nightIcon = nightIndex.weather[0].icon? dayIndex.weather[0].icon : '01n'

        const maxTemp = temps.reduce((a, b) => Math.max(a, b), -Infinity);
        const minTemp = temps.reduce((a, b) => Math.min(a, b), +Infinity);

        const sorted = conditions.sort((a, b) => a - b)
        const median = sorted[Math.floor(sorted.length / 2)]

        const sortedIcon = icons.sort((a, b) => a - b)
        //const medianIcon = 'https://openweathermap.org/img/wn/' + sortedIcon[Math.floor(sortedIcon.length / 2)] + '.png'
        //const displayDayIcon = 'https://openweathermap.org/img/wn/' + dayIcon + '.png'
        //const displayNightIcon = 'https://openweathermap.org/img/wn/' + nightIcon + '.png'
        setDisplayData({ dominant_condition: median, maxTemp: maxTemp, minTemp: minTemp, dayIcon: dayIcon, nightIcon: nightIcon })


    }, [])
    console.log(displayData)
    if (displayData?.maxTemp && displayData?.minTemp && displayData?.dayIcon && displayData?.nightIcon) {
        return (
            <div className='bg-sky-500 rounded-lg content-center p-2 m-1 flex flex-col grow w-full basis-1/2 text-center items-center'>
                <h3>{title}</h3>
                <WeatherIcon icontype={displayData.dayIcon} className="size-[23vh]"/>
                <p>{displayData.maxTemp.toFixed(2) + "C"}</p>
                <WeatherIcon icontype={displayData.nightIcon} className="size-[23vh]"/>
                <p>{displayData.minTemp.toFixed(2) + "C"}</p>
            </div>
        )
    }


}
function BriefWeather({ fcWeather }) {
    const todayPlus = forecastWeather(fcWeather)
    console.log(todayPlus)
    const [weatherData, setWeatherData] = useState([todayPlus[0], todayPlus[1]]);
    console.log(weatherData)
    return (
        <>
            <WeatherDisplay title={'Today'} weatherData={weatherData[0]} />
            <WeatherDisplay title={'Tomorrow'} weatherData={weatherData[1]} />
        </>

    )

}
export default BriefWeather