import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Cities from './pages/Cities'
import Forecast from './pages/Forecast'
import CityForecast from './pages/CityForecast'

function App() {
  return (
    <>
      <div>
        <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
          <Link to='/'>Mi clima</Link>
          <Link to='/ciudades'>Ciudades</Link>
          <Link to='/prevision'>Previsión local</Link>
          <Link to='/prevision-ciudad'>Previsión ciudades</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ciudades' element={<Cities />} />
          <Route path='/prevision' element={<Forecast />} />
          <Route path='/prevision-ciudad' element={<CityForecast />} />
        </Routes>
      </div>
    </>
  )
}

export default App
