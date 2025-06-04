import React, { useEffect, useState } from 'react'
import { GetCurrentWeather } from '../Api/weather'
import Loader from '../components/Loader'
import Error from '../components/Error'

const Home = () => {
  const [coords, setCoords] = useState(null)
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      () => setError('Activa la geolocalización para usar esta app')
    )
  }, [])

  useEffect(() => {
    if (coords) {
      GetCurrentWeather(coords.lat, coords.lon).then(setWeather)
    }
  }, [coords])

  if (error) return <Error message={error} />
  if (!weather) return <Loader />

  const iconUrl = `http://openweathermap.org/img/w/${weather.weather[0].icon}.png`

  return (
    <div>
      <h2>Clima en tu ubicación</h2>
      <p>{weather.name}</p>
      <p>{weather.main.temp} °C</p>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p>{weather.weather[0].description}</p>
    </div>
  )
}

export default Home
