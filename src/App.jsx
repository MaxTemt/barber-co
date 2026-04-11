import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
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

function HomePage({ showToast }) {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Reviews />
      <Booking onBookingSuccess={() => showToast('✓ Заявка принята! Мы перезвоним за 15 минут')} />
      <FAQ />
    </>
  )
}

function App() {
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = (message) => {
    setToastMessage(message)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 4000)
  }

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage showToast={showToast} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <Toast message={toastMessage} visible={toastVisible} />
    </Router>
  )
}

export default App
