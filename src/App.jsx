import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'

import MoviesPage from './pages/MoviesPage/MoviesPage.jsx'
import MovieDetails from './pages/MovieDatails/MovieDetails.jsx'
import MovieActher from './pages/MovieActher/MovieActher.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MoviesPage />} />
        <Route path="movie/:id" element={<MovieDetails />} />
        <Route path="actor/:id" element={<MovieActher />} />
      </Route>
    </Routes>
  )
}

export default App
