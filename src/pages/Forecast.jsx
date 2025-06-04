import { useEffect, useState } from 'react'
import { getForecast } from '../api/weather'
import Loader from '../components/Loader'
import Error from '../components/Error'

function groupByDay(list) {
  const days = {}
  list.forEach((item) => {
    const day = item.dt_txt.split(' ')[0]
    if (!days[day]) days[day] = []
    days[day].push(item)
  })
  return Object.entries(days)
}

export default function Forecast() {
  const [coords, setCoords] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
      },
      () => setError('Activa la geolocalización para usar esta vista.')
    )
  }, [])

  useEffect(() => {
    if (coords) {
      getForecast(coords.lat, coords.lon).then(setForecast)
    }
  }, [coords])

  if (error) return <Error message={error} />
  if (!forecast) return <Loader />

  const grouped = groupByDay(forecast.list)

  return (
    <div>
      <h2>Previsión a 5 días (ubicación actual)</h2>
      {grouped.map(([day, entries]) => (
        <div key={day}>
          <h3>{day}</h3>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
            {entries.map((item) => (
              <div key={item.dt}>
                <p>{item.dt_txt.split(' ')[1]}</p>
                <p>{item.main.temp} °C</p>
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
