import { useState } from 'react'
import { getForecast } from '../Api/weather'
import { cities } from '../Data/Cities'
import Loader from '../components/Loader'

function groupByDay(list) {
  const days = {}
  list.forEach((item) => {
    const day = item.dt_txt.split(' ')[0]
    if (!days[day]) days[day] = []
    days[day].push(item)
  })
  return Object.entries(days)
}

export default function CityForecast() {
  const [selected, setSelected] = useState(null)
  const [forecast, setForecast] = useState(null)

  const handleChange = async (e) => {
    const city = cities.find((c) => c.name === e.target.value)
    setSelected(city)
    setForecast(null)
    const data = await getForecast(city.lat, city.lon)
    setForecast(data)
  }
  const grouped = forecast ? groupByDay(forecast.list) : []

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
      {forecast ? (
        <div>
          {grouped.map(([day, entries]) => (
            <div key={day}>
              <h3>{day}</h3>
              <div style={{ display: 'flex', gap: '1rem', overflow: 'auto' }}>
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
      ) : selected ? (
        <Loader />
      ) : null}
    </div>
  )
}
