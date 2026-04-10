import { useEffect, useRef, useState } from 'react'
import './Hero.scss'

function Hero() {
  const heroRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const scrollToBooking = () => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__bg">
        <div className="hero__gradient-1"></div>
        <div className="hero__gradient-2"></div>
        <div className="hero__gradient-3"></div>
      </div>
      <div className="hero__noise"></div>

      <div className={`hero__content ${visible ? 'hero__content--visible' : ''}`}>
        <p className="hero__label">Barbershop премиум-класса</p>
        <h1 className="hero__headline">
          Острые лезвия.<br />
          <span className="hero__headline-accent">Точные линии.</span><br />
          Чистота.
        </h1>
        <p className="hero__subtitle">
          Мужские стрижки, бритьё опасной бритвой, уход за бородой<br />
          от мастеров с опытом более 5 лет
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary btn--lg" onClick={scrollToBooking}>
            Записаться онлайн
          </button>
          <a href="#services" className="btn btn--ghost btn--lg" onClick={(e) => {
            e.preventDefault()
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
          }}>
            Услуги и цены
          </a>
        </div>
      </div>

      <div className="hero__scroll">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  )
}

export default Hero
