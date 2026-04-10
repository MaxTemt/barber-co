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
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="14" cy="14" r="8"/><circle cx="14" cy="34" r="8"/>
      <line x1="20" y1="18" x2="38" y2="6"/><line x1="20" y1="30" x2="38" y2="42"/>
    </svg>
  ),
  beard: (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M24 8c-6 0-12 4-12 12v4c0 8 4 16 12 16s12-8 12-16v-4c0-8-6-12-12-12z"/>
      <path d="M18 24h12M24 20v8"/>
    </svg>
  ),
  razor: (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="8" y="18" width="32" height="12" rx="2"/><line x1="12" y1="24" x2="36" y2="24"/>
      <path d="M16 12v6M32 12v6M16 30v6M32 30v6"/>
    </svg>
  ),
  crown: (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 36L4 16l10 8 10-16 10 16 10-8-4 20H8z"/>
    </svg>
  ),
  child: (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="24" cy="14" r="8"/><path d="M16 28v12M32 28v12M12 40h24"/>
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
        <header className="services__header">
          <span className="section-label">Услуги</span>
          <h2 className="section-title">Не просто стрижка. Ритуал.</h2>
          <p className="section-subtitle">
            Горячее полотенце, массаж головы, виски — включено в комплекс
          </p>
        </header>

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

        <div className="services__grid">
          {filteredServices.map((service, i) => (
            <div
              key={service.id}
              className="service-card"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="service-card__icon">
                {serviceIcons[service.icon]}
              </div>
              <h3 className="service-card__title">{service.name}</h3>
              <p className="service-card__desc">{service.description}</p>
              <div className="service-card__meta">
                <span className="service-card__price">{service.price.toLocaleString()} ₽</span>
                <span className="service-card__duration">{service.duration} мин</span>
              </div>
              <button className="service-card__btn" onClick={scrollToBooking}>
                Записаться
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
