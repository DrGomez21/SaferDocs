import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { SecurePage } from './pages/SecurePage.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/app' element={<SecurePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
