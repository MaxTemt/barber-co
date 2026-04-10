import { useContext } from 'react'
import './Footer.scss'
import { ThemeContext } from '../../utils/themeContext'

function Footer() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Контакты */}
          <div className="footer__column">
            <h4 className="footer__column-title">Контакты</h4>
            <ul className="footer__list">
              <li>
                <a href="tel:+79991234567" className="footer__link">
                  +7 999 123-45-67
                </a>
              </li>
              <li>
                <a href="https://wa.me/79991234567" target="_blank" rel="noopener noreferrer" className="footer__link">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="https://t.me/barberco" target="_blank" rel="noopener noreferrer" className="footer__link">
                  Telegram
                </a>
              </li>
              <li>
                <a href="mailto:email@barberco.ru" className="footer__link">
                  email@barberco.ru
                </a>
              </li>
            </ul>
          </div>

          {/* Соцсети */}
          <div className="footer__column">
            <h4 className="footer__column-title">Соцсети</h4>
            <div className="footer__socials">
              <a href="https://instagram.com/barberco" target="_blank" rel="noopener noreferrer" className="footer__social">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="4" width="24" height="24" rx="6" stroke="#CCCCCC" strokeWidth="2"/>
                  <circle cx="16" cy="16" r="6" stroke="#CCCCCC" strokeWidth="2"/>
                  <circle cx="23" cy="9" r="1.5" fill="#CCCCCC"/>
                </svg>
              </a>
              <a href="https://tiktok.com/@barberco" target="_blank" rel="noopener noreferrer" className="footer__social">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M22 8c-1.5 0-3-.5-4-1.5V18c0 4-3 7-7 7s-7-3-7-7 3-7 7-7c.5 0 1 0 1.5.1V7C8.5 7 5 10.5 5 15s3.5 8 8 8 8-3.5 8-8V12c2 1.5 4.5 2 7 2V8h-6z" fill="#CCCCCC"/>
                </svg>
              </a>
              <a href="https://youtube.com/@barberco" target="_blank" rel="noopener noreferrer" className="footer__social">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="2" y="8" width="28" height="16" rx="6" stroke="#CCCCCC" strokeWidth="2"/>
                  <path d="M13 12v8l7-4-7-4z" fill="#CCCCCC"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Карта */}
          <div className="footer__column">
            <h4 className="footer__column-title">Как нас найти</h4>
            <div className="footer__map">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.617698%2C55.755819&z=15&pt=37.617698%2C55.755819%2Cpm2rdm"
                width="200"
                height="120"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
                title="Яндекс.Карта"
              ></iframe>
            </div>
            <p className="footer__address">
              Москва, ул. Тверская, 1
            </p>
          </div>

          {/* Ссылки */}
          <div className="footer__column">
            <h4 className="footer__column-title">Информация</h4>
            <ul className="footer__list">
              <li>
                <a href="#" className="footer__link">Политика конфиденциальности</a>
              </li>
              <li>
                <a href="#" className="footer__link">Публичная оферта</a>
              </li>
            </ul>
            <button className="footer__theme-toggle" onClick={toggleTheme} aria-label="Переключить тему">
              {theme === 'dark' ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Barber & Co. Все права защищены.</p>
          <button className="footer__to-top" onClick={scrollToTop}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
