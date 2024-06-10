import { useEffect, useState } from "react"
import forecastWeather from "../util/ForecastWeather"
import WeatherIcon from "../util/WeatherIcon"

const Day = ({ day }) => {
    const [weather, setWeather] = useState()
    useEffect(() => {
        const temps = []
        const conditions = []
        const icons = []
        day.value.list.forEach((data, _) => {
            temps.push(data.main.temp)
            conditions.push(data.weather[0].main)
            icons.push(data.weather[0].icon)
        })
        const maxTemp = temps.reduce((a, b) => Math.max(a, b), -Infinity);
        const minTemp = temps.reduce((a, b) => Math.min(a, b), +Infinity);

        //const sum = temps.reduce((item, current) => item + current)
        //const mean = sum / temps.length

        const sorted = conditions.sort((a, b) => a - b)
        const median = sorted[Math.floor(sorted.length / 2)]

        const sortedIcon = icons.sort((a, b) => a - b)
        const medianIcon = sortedIcon[Math.floor(sortedIcon.length / 2)]

        setWeather({dominant_condition: median, icon: medianIcon, maxTemp:maxTemp, minTemp:minTemp})
    }, [])
    if (weather?.maxTemp && weather?.minTemp && weather?.dominant_condition && weather?.icon) {
        return (
            <div className=' @container bg-sky-500 rounded-lg grow flex flex-col basis-1/6 m-2 text-center items-center'>
                <h3 className=" self-center">{day.value.date.format('ddd')}</h3>
                <WeatherIcon icontype={weather.icon} className="lg:size-[23vh] flex flex-shrink"/>
                <p className="lg:text-3xl">{weather.maxTemp.toFixed(2)+ "C"}</p>
                <p className="lg:text-3xl">{weather.minTemp.toFixed(2)+ "C"}</p>
            </div>
        )
    }
}

export default function Forecast({ fcWeather }) {
    const [days, setDays] = useState([])
    useEffect(() => {
        setDays([...forecastWeather(fcWeather)])
    }, [])
    return (
        <>
            {
                days.map((day, index) => {
                    return (
                        <Day day={day} key={`${day.key}-${index}`} />
                    )
                })
            }
        </>
    )
}
