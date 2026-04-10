import { useState, useEffect, useContext } from 'react'
import './Header.scss'
import { ThemeContext } from '../../utils/themeContext'

const navItems = ['Главная', 'Услуги', 'Портфолио', 'О нас', 'Отзывы', 'Контакты']

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollToSection = (id) => {
    setMenuOpen(false)
    const sectionMap = {
      'Главная': 'hero',
      'Услуги': 'services',
      'Портфолио': 'portfolio',
      'О нас': 'about',
      'Отзывы': 'reviews',
      'Контакты': 'footer'
    }
    const element = document.getElementById(sectionMap[id])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToBooking = () => {
    setMenuOpen(false)
    const element = document.getElementById('booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__container">
          <a
            href="#"
            className="header__logo"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            <svg className="header__logo-icon" width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M8 4L24 28M24 4L8 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
              <circle cx="16" cy="24" r="1.5" fill="currentColor"/>
            </svg>
            <span className="header__logo-text">BARBER & CO</span>
          </a>

          <nav className="header__nav">
            <ul className="header__nav-list">
              {navItems.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="header__nav-link"
                    onClick={(e) => { e.preventDefault(); scrollToSection(item) }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button className="header__theme-toggle" onClick={toggleTheme} aria-label="Переключить тему">
              {theme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="4"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button className="header__book-btn" onClick={scrollToBooking}>
              Записаться
            </button>
            <button className="header__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
              <span className={`header__hamburger-line ${menuOpen ? 'active' : ''}`}></span>
              <span className={`header__hamburger-line ${menuOpen ? 'active' : ''}`}></span>
              <span className={`header__hamburger-line ${menuOpen ? 'active' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`drawer ${menuOpen ? 'drawer--open' : ''}`}>
        <button className="drawer__close" onClick={() => setMenuOpen(false)} aria-label="Закрыть">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <nav className="drawer__nav">
          <ul className="drawer__list">
            {navItems.map((item, i) => (
              <li key={item} style={{ animationDelay: `${i * 0.05}s` }}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="drawer__link"
                  onClick={(e) => { e.preventDefault(); scrollToSection(item) }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="drawer__book-btn" onClick={scrollToBooking}>
          Записаться
        </button>
      </div>

      {/* Overlay */}
      <div className={`drawer__overlay ${menuOpen ? 'drawer__overlay--visible' : ''}`} onClick={() => setMenuOpen(false)} />
    </>
  )
}

export default Header
