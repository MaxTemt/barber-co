import { useState, useEffect } from 'react'
import './Portfolio.scss'
import { portfolioItems } from '../../utils/data'

function Portfolio() {
  const [selectedItem, setSelectedItem] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (item) => {
    setSelectedItem(item)
    setModalOpen(true)
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedItem(null)
    document.body.classList.remove('modal-open')
  }

  const navigate = (direction) => {
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedItem.id)
    let newIndex
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % portfolioItems.length
    } else {
      newIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length
    }
    setSelectedItem(portfolioItems[newIndex])
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalOpen) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft') navigate('prev')
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [modalOpen, selectedItem])

  const scrollToBooking = () => {
    closeModal()
    const element = document.getElementById('booking')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="portfolio" className="portfolio scroll-offset">
      <div className="container">
        <h2 className="portfolio__title">Наши работы</h2>
        <p className="portfolio__subtitle">Реальные стрижки наших мастеров</p>

        <div className="portfolio__grid">
          {portfolioItems.map(item => (
            <div
              key={item.id}
              className="portfolio-card"
              onClick={() => openModal(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="portfolio-card__img"
              />
              <div className="portfolio-card__overlay">
                <p className="portfolio-card__title">{item.title}</p>
                <p className="portfolio-card__master">мастер {item.master}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <div className={`modal-overlay ${modalOpen ? 'active' : ''}`} onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          {selectedItem && (
            <>
              <button className="modal-nav modal-nav--prev" onClick={() => navigate('prev')}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              <div className="modal-body">
                <img
                  src={selectedItem.image.replace('w=400&h=400', 'w=800&h=600')}
                  alt={selectedItem.title}
                  className="modal-body__img"
                />
                <div className="modal-body__info">
                  <h3 className="modal-body__title">{selectedItem.title}</h3>
                  <p className="modal-body__master">Мастер: {selectedItem.master}</p>
                  <button className="modal-body__btn" onClick={scrollToBooking}>
                    Записаться к мастеру
                  </button>
                </div>
              </div>

              <button className="modal-nav modal-nav--next" onClick={() => navigate('next')}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
