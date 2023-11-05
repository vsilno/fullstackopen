/* eslint-disable react/prop-types */
const Country = ({name, capital, area, languages, flags, weather}) => {
    return (
        <div>
            <h2>{name.common}</h2>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <h3>languages:</h3>
            <ul>
                {
                    Object.values(languages).map(
                        (lang) => (<li key={lang}>{lang}</li>)
                    )
                }
            </ul>
            <picture>
                 <img src={flags.png} /> 
            </picture>
            <h2>Weather in {capital}</h2>
            <p>Temperature {weather.main.temp} Celcius</p>
            <picture>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /> 
            </picture>
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Country