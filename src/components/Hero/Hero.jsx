import { useEffect, useRef, useState } from 'react'
import './Hero.scss'

function Hero() {
  const heroRef = useRef(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToBooking = () => {
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero__video-container">
        <video
          className="hero__video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay"></div>
      </div>

      <div
        className="hero__content"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <h1 className="hero__headline">
          Острые лезвия. Точные линии. Чистота.
        </h1>
        <p className="hero__subheadline">
          Мужские стрижки, бритьё опасной бритвой, уход за бородой от мастеров с 5+ годами опыта
        </p>
        <button className="hero__cta" onClick={scrollToBooking}>
          Выбрать мастера и время
        </button>
      </div>

      <div className="hero__scroll-indicator">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
          <rect x="2" y="2" width="20" height="36" rx="10" stroke="#B8860B" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" fill="#B8860B">
            <animate attributeName="cy" values="12;24;12" dur="1.5s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
    </section>
  )
}

export default Hero
