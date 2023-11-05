import axios from 'axios'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"
const allCountries = "api/all/"
const singleCountry = "name/"

const getCountries = () => {
    const res = axios.get(`${baseUrl}${allCountries}`)
    return res.then(res => res.data)
}

const getCountry = (country) => {
    const res = axios.get(`${baseUrl}${singleCountry}${country}`)
    return res.then(res => res.data)
}

export default { getCountries, getCountry }