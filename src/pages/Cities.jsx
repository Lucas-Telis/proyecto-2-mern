import React from 'react'
import { useState } from 'react'
import { GetCurrentWeather } from '../Api/weather'
import { cities } from '../Data/Cities'
import Loader from '../components/Loader'

const Cities = () => {
  const [selected, setSelected] = useState(null)
  const [weather, setWeather] = useState(null)

  const handleChange = async (e) => {
    const city = cities.find((c) => c.name === e.target.value)
    setSelected(city)
    setWeather(null)
    const data = await GetCurrentWeather(city.lat, city.lon)
    setWeather(data)
  }
  return (
    <div>
      <h2>Clima por ciudad</h2>
      <select onChange={handleChange} defaultValue=''>
        <option value='' disabled>
          Selecciona una ciudad
        </option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      {weather ? (
        <div>
          <p>{weather.name}</p>
          <p>{weather.main.temp} °C</p>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>
        </div>
      ) : selected ? (
        <Loader />
      ) : null}
    </div>
  )
}

export default Cities
