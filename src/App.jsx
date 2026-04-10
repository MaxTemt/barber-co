import { useState, useEffect, useReducer } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import Portfolio from './components/Portfolio/Portfolio'
import About from './components/About/About'
import Reviews from './components/Reviews/Reviews'
import Booking from './components/Booking/Booking'
import FAQ from './components/FAQ/FAQ'
import Footer from './components/Footer/Footer'
import Toast from './components/Toast/Toast'
import NotFound from './NotFound'
import { ThemeContext, themeReducer } from './utils/themeContext'

function HomePage({ showToast }) {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Reviews />
      <Booking onBookingSuccess={() => showToast('Заявка принята! Мы перезвоним за 15 минут')} />
      <FAQ />
    </>
  )
}

function App() {
  const [theme, dispatchTheme] = useReducer(themeReducer, 'dark')
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const toggleTheme = () => dispatchTheme({ type: 'TOGGLE' })

  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : ''
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage showToast={showToast} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toast message={toastMessage} visible={toastVisible} />
      </Router>
    </ThemeContext.Provider>
  )
}

export default App
