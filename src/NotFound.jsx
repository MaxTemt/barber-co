import { Link } from 'react-router-dom'
import '../src/styles/main.scss'
import './NotFound.scss'

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__content">
        <svg className="not-found__icon" width="120" height="120" viewBox="0 0 120 120" fill="none">
          {/* Sleeping barber with scissors */}
          <circle cx="60" cy="50" r="30" fill="#2C2C2C" stroke="#B8860B" strokeWidth="2"/>
          <path d="M45 45c0-5 5-10 15-10s15 5 15 10" stroke="#B8860B" strokeWidth="2" fill="none"/>
          <line x1="50" y1="48" x2="55" y2="48" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
          <line x1="65" y1="48" x2="70" y2="48" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
          <path d="M55 58c2 2 8 2 10 0" stroke="#B8860B" strokeWidth="2" fill="none"/>
          <path d="M35 75l-10 30M85 75l10 30" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
          <path d="M40 60l-15 20M80 60l15 20" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
          <path d="M20 25l10 10M100 25l-10 10" stroke="#B8860B" strokeWidth="2" strokeLinecap="round"/>
          <text x="60" y="100" textAnchor="middle" fill="#B8860B" fontSize="16" fontFamily="Roboto">Zzz...</text>
        </svg>
        
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Барбер уснул с ножницами</p>
        <p className="not-found__text">
          Страница, которую вы ищете, не найдена. Возможно, она была удалена или перемещена.
        </p>
        <a href="/" className="not-found__btn">
          Подстричься обратно на главную
        </a>
      </div>
    </div>
  )
}

export default NotFound
