import { useState } from 'react'
import './Portfolio.scss'
import { portfolioItems } from '../../utils/data'

function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(null)

  const openModal = (index) => {
    setActiveIndex(index)
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    setActiveIndex(null)
    document.body.classList.remove('modal-open')
  }

  const navigate = (dir) => {
    setActiveIndex(prev => {
      const len = portfolioItems.length
      return (prev + dir + len) % len
    })
  }

  return (
    <section id="portfolio" className="portfolio scroll-offset">
      <div className="container">
        <header className="portfolio__header">
          <span className="section-label">Портфолио</span>
          <h2 className="section-title">Наши работы</h2>
          <p className="section-subtitle">
            Каждая стрижка — это произведение искусства
          </p>
        </header>

        <div className="portfolio__grid">
          {portfolioItems.map((item, i) => (
            <div
              key={item.id}
              className="portfolio-card"
              onClick={() => openModal(i)}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
              <div className="portfolio-card__overlay">
                <div className="portfolio-card__info">
                  <h3>{item.title}</h3>
                  <p>Мастер: {item.master}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeIndex !== null && (
        <div className="modal-overlay active" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="modal-nav modal-nav--prev" onClick={() => navigate(-1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <img
              src={portfolioItems[activeIndex].image.replace('w=400&h=400', 'w=900&h=600')}
              alt={portfolioItems[activeIndex].title}
            />
            <button className="modal-nav modal-nav--next" onClick={() => navigate(1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Portfolio
