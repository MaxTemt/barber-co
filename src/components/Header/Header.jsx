import { useState, useEffect, useContext } from 'react'
import './Header.scss'
import { ThemeContext } from '../../utils/themeContext'

const navItems = ['Главная', 'Услуги', 'Портфолио', 'Цены', 'Контакты']

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setMenuOpen(false)
    const sectionMap = {
      'Главная': 'hero',
      'Услуги': 'services',
      'Портфолио': 'portfolio',
      'Цены': 'services',
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
          <a href="#" className="header__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <svg className="header__logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 4L24 28M24 4L8 28" stroke="#B8860B" strokeWidth="3" strokeLinecap="round"/>
              <path d="M4 16H28" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="8" r="2" fill="#B8860B"/>
              <circle cx="16" cy="24" r="2" fill="#B8860B"/>
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFBF00">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#FFBF00" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#B8860B">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <button className="header__book-btn" onClick={scrollToBooking}>
              Записаться
            </button>
            <button className="header__hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
              <span className={`header__hamburger-line ${menuOpen ? 'header__hamburger-line--active' : ''}`}></span>
              <span className={`header__hamburger-line ${menuOpen ? 'header__hamburger-line--active' : ''}`}></span>
              <span className={`header__hamburger-line ${menuOpen ? 'header__hamburger-line--active' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`header__drawer ${menuOpen ? 'header__drawer--open' : ''}`}>
        <button className="header__drawer-close" onClick={() => setMenuOpen(false)} aria-label="Закрыть">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        <nav className="header__drawer-nav">
          <ul className="header__drawer-list">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="header__drawer-link"
                  onClick={(e) => { e.preventDefault(); scrollToSection(item) }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button className="header__drawer-book-btn" onClick={scrollToBooking}>
          Записаться
        </button>
      </div>
    </>
  )
}

export default Header
