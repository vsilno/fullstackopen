import { useState, useEffect } from 'react'
import Country from './components/Country'
import countriesapi from './utils/countries'
import weatherapi from './utils/weather'
import SearchForm from './components/SearchForm'
import CountryName from './components/CountryName'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [weather, setWeather] = useState('')

  useEffect(() => {
    console.log('Fetching countries...')
    countriesapi.getCountries()
      .then(res => setCountries(res))
  }, [])

  useEffect(() => {
    if (searchResult && searchResult.length === 1) {
      console.log('Fetching weather...')
      const { latlng } = searchResult[0]
      const [lat, lon] = latlng
      weatherapi
        .getWeather({lat, lon})
        .then(res => setWeather(res))
    }
  }, [searchResult])

  const filterCountries = (array, string) => {
    const perfectMatch = []
    const nString = string.toLowerCase()
    const filteredArray = array.filter(c => {
      const nName = c.name.common.toLowerCase()
      if (nName === nString) {
        perfectMatch.push(c)
      } 
      return  nName.includes(nString)
    })

    return perfectMatch[0] ? perfectMatch : filteredArray
  }

  const handleSearch = ({target}) => {
    const search = target.value
    const filteredCountries = search ? filterCountries([...countries], search) : ''
    setSearchResult(filteredCountries)
    setSearch(search)
  }

  return (  
    <>
      <div>
          <SearchForm { ...{search, handleSearch} } />
          <div>
            {
              searchResult.length > 10
                ? 'Too many matches, please improve your search' 
                : searchResult.length > 1 
                ? searchResult.map(c => (<CountryName key={c.cca3} name={c.name.common} handleSearch={handleSearch} />))
                : (searchResult[0] && weather)
                ? <Country { ...searchResult[0] } weather={weather} />
                : <p>{search ? 'There are no results for your search' : 'Search for an specific country to see its data'}</p>
            }
          </div>
      </div>
    </>
  )
}

export default App
