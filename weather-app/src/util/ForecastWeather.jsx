import dayjs from "dayjs"

const forecastWeather = (fcweather) => {
    // NOTE: create a hashmap and get the list
    const days = new Map()
    const list = fcweather.list
    for (let interval of list) {
        // NOTE: get the date of the current interval
        const date = new dayjs(interval.dt * 1000)
        const formatted = date.format('DD/MM/YYYY');

        // NOTE: See if the formatted date is already in the map
        const day = days.get(formatted)
        // if there is already a record for that day, add to it
        if (day) {
            days.set(formatted, {
                ...day,
                list: [...day.list, interval]
            })
        } else {
            // if there is not a record for that day, create one
            days.set(formatted, {
                date: date,
                list: [interval]
            })
        }
    }
    const d = []
    for (const [key, value] of days) {
        d.push({ key, value })
    }
    return d
}

export default forecastWeather
