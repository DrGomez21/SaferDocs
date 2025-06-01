import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { SecurePage } from './pages/SecurePage.jsx'
import { NotFoundPage } from './pages/NorFound.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/app' element={<SecurePage />} />
        <Route path='*' element={<NotFoundPage />} />
        {/* Catch-all route for 404 Not Found */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
