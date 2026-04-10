import { useState, useEffect, useRef } from 'react'
import './About.scss'

function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let startTime
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      // Easing: cubic-bezier approximation
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return (
    <div className="stat-item" ref={counterRef}>
      <span className="stat-item__value">
        {count}{suffix}
      </span>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="about scroll-offset">
      <div className="container">
        <div className="about__grid">
          <div className="about__left">
            <h2 className="about__title">Больше чем парикмахерская</h2>
            <p className="about__text">
              Barber & Co — это место, где традиции барберинга встречаются с современным стилем. 
              Мы открылись в 2021 году с простой идеей: создать пространство, где каждый мужчина 
              получит сервис премиум-класса по доступной цене.
              <br /><br />
              Наши мастера обучались в лучших академиях Европы, включая Vidal Sassoon в Лондоне. 
              Мы используем только профессиональную косметику и инструменты премиум-класса. 
              Каждый клиент для нас — это не просто стрижка, а опыт, который он заслуживает.
              <br /><br />
              Стерильность инструментов — наш приоритет. Автоклавы, одноразовые расходники, 
              обработка поверхностей после каждого клиента. Ваш комфорт и безопасность на первом месте.
            </p>

            <div className="about__stats">
              <div className="stat-item">
                <Counter target={2500} suffix="+" />
                <span className="stat-item__label">клиентов</span>
              </div>
              <div className="stat-item">
                <Counter target={8} />
                <span className="stat-item__label">мастеров</span>
              </div>
              <div className="stat-item">
                <Counter target={4} />
                <span className="stat-item__label">года в рынке</span>
              </div>
            </div>
          </div>

          <div className="about__right">
            <div className="about__photo">
              <img
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=700&fit=crop"
                alt="Владелец барбершопа"
                loading="lazy"
              />
            </div>

            <div className="about__icons">
              <div className="about__icon" data-tooltip="Сертификат Vidal Sassoon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="#B8860B" strokeWidth="2"/>
                  <path d="M12 20l6 6 10-12" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="about__icon" data-tooltip="Стерилизация автоклавом">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="8" y="12" width="24" height="20" rx="2" stroke="#B8860B" strokeWidth="2"/>
                  <path d="M12 12V8a8 8 0 0116 0v4" stroke="#B8860B" strokeWidth="2"/>
                  <path d="M16 22h8" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="about__icon" data-tooltip="Бесконтактная оплата">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <rect x="6" y="10" width="28" height="20" rx="3" stroke="#B8860B" strokeWidth="2"/>
                  <path d="M6 18h28" stroke="#B8860B" strokeWidth="2"/>
                  <path d="M10 24h8" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
