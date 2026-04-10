import { Link } from 'react-router-dom'
import './NotFound.scss'

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <svg className="not-found__icon" width="80" height="80" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="50" r="30" fill="#1a1a1a" stroke="#c8a96e" strokeWidth="2"/>
          <path d="M45 45c0-5 5-10 15-10s15 5 15 10" stroke="#c8a96e" strokeWidth="2" fill="none"/>
          <line x1="50" y1="48" x2="55" y2="48" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round"/>
          <line x1="65" y1="48" x2="70" y2="48" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round"/>
          <path d="M55 58c2 2 8 2 10 0" stroke="#c8a96e" strokeWidth="2" fill="none"/>
          <path d="M35 75l-10 30M85 75l10 30" stroke="#c8a96e" strokeWidth="2" strokeLinecap="round"/>
          <text x="60" y="96" textAnchor="middle" fill="#c8a96e" fontSize="14" fontFamily="Roboto">Zzz...</text>
        </svg>

        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Барбер уснул с ножницами</p>
        <p className="not-found__text">
          Страница не найдена. Возможно, она была удалена или перемещена.
        </p>
        <Link to="/" className="btn btn--primary btn--lg">
          На главную
        </Link>
      </div>
    </div>
  )
}

export default NotFound
