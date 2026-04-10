import { useRef, useState, useEffect } from 'react'
import './About.scss'

const stats = [
  { value: 7, suffix: '+', label: 'Лет опыта' },
  { value: 5000, suffix: '+', label: 'Клиентов' },
  { value: 3, suffix: '', label: 'Мастера' },
  { value: 4.9, suffix: '', label: 'Средний рейтинг', decimals: 1 }
]

function About() {
  const sectionRef = useRef(null)
  const [counters, setCounters] = useState(stats.map(() => 0))
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          animateCounters()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const animateCounters = () => {
    stats.forEach((stat, idx) => {
      const duration = 2000
      const steps = 60
      const interval = duration / steps
      let step = 0

      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = stat.value * eased

        setCounters(prev => {
          const next = [...prev]
          next[idx] = stat.decimals ? parseFloat(current.toFixed(stat.decimals)) : Math.floor(current)
          return next
        })

        if (step >= steps) clearInterval(timer)
      }, interval)
    })
  }

  return (
    <section id="about" className="about scroll-offset" ref={sectionRef}>
      <div className="container">
        <header className="about__header">
          <span className="section-label">О нас</span>
          <h2 className="section-title">Больше чем барбершоп</h2>
          <p className="section-subtitle">
            Мы создаём пространство, где каждый мужчина чувствует себя уверенно
          </p>
        </header>

        <div className="about__stats">
          {stats.map((stat, i) => (
            <div key={stat.label} className="about__stat">
              <div className="about__stat-value">
                {counters[i]}{stat.suffix}
              </div>
              <div className="about__stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="about__features">
          <div className="about__feature">
            <div className="about__feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <h3>Стерильность</h3>
            <p>Автоклав для стерилизации всех инструментов после каждого клиента</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>Опыт</h3>
            <p>Мастера с опытом более 5 лет и регулярным повышением квалификации</p>
          </div>
          <div className="about__feature">
            <div className="about__feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <path d="M2 10h20" strokeLinecap="round"/>
              </svg>
            </div>
            <h3>Удобная оплата</h3>
            <p>Наличные, карты, СБП, Apple Pay, Google Pay — как вам удобно</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
