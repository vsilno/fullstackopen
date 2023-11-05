import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const endUrl = `&appid=${api_key}`

const getWeather = (countryData) => {
    const res = axios.get(`${baseUrl}lat=${countryData.lat}&lon=${countryData.lon}&units=metric${endUrl}`)
    return res.then(res => res.data)
}

export default { getWeather }