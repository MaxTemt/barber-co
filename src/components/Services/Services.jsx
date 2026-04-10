import { useState } from 'react'
import './Services.scss'
import { services } from '../../utils/data'

const categories = [
  { id: 'all', label: 'Все' },
  { id: 'haircut', label: 'Стрижки' },
  { id: 'beard', label: 'Борода' },
  { id: 'shave', label: 'Бритьё' },
  { id: 'complex', label: 'Комплекс' }
]

const serviceIcons = {
  scissors: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2"/>
      <circle cx="14" cy="34" r="8" stroke="currentColor" strokeWidth="2"/>
      <line x1="20" y1="18" x2="38" y2="6" stroke="currentColor" strokeWidth="2"/>
      <line x1="20" y1="30" x2="38" y2="42" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  beard: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M24 8c-6 0-12 4-12 12v4c0 8 4 16 12 16s12-8 12-16v-4c0-8-6-12-12-12z" stroke="currentColor" strokeWidth="2"/>
      <path d="M18 24h12M24 20v8" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  razor: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="18" width="32" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 24h24" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 12v6M32 12v6M16 30v6M32 30v6" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  crown: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <path d="M8 36L4 16l10 8 10-16 10 16 10-8-4 20H8z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  child: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="14" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="M16 28v12M32 28v12M12 40h24" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function Services() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory)

  const scrollToBooking = () => {
    const element = document.getElementById('booking')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="services scroll-offset">
      <div className="container">
        <h2 className="services__title">Не просто стрижка. Ритуал.</h2>
        <p className="services__subtitle">
          Горячее полотенце, массаж головы, виски — включено в комплекс
        </p>

        <div className="services__chips">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`services__chip ${activeCategory === cat.id ? 'services__chip--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="services__grid">
          {filteredServices.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-card__icon" style={{ color: '#B8860B' }}>
                {service_icons[service.icon]}
              </div>
              <h3 className="service-card__title">{service.name}</h3>
              <p className="service-card__desc">{service.description}</p>
              <span className="service-card__price">{service.price} ₽</span>
              <span className="service-card__duration">{service.duration} мин</span>
              <button className="service-card__btn" onClick={scrollToBooking}>
                Записаться
              </button>
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="services__accordion mobile-only">
          {filteredServices.map(service => (
            <details key={service.id} className="service-accordion__item">
              <summary className="service-accordion__summary">
                <span>{service.name}</span>
                <span className="service-accordion__price">{service.price} ₽</span>
              </summary>
              <div className="service-accordion__content">
                <p>{service.description}</p>
                <p className="service-accordion__duration">{service.duration} мин</p>
                <button className="service-accordion__btn" onClick={scrollToBooking}>
                  Записаться
                </button>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
