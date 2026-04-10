import './Reviews.scss'
import { reviews } from '../../utils/data'

function Stars({ rating }) {
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i < rating ? '#c8a96e' : '#333'}>
          <path d="M8 0l2.5 5 5.5.8-4 3.9.9 5.3L8 12.5 3.1 15l.9-5.3-4-3.9L5.5 5z"/>
        </svg>
      ))}
    </div>
  )
}

function Reviews() {
  return (
    <section id="reviews" className="reviews scroll-offset">
      <div className="container">
        <header className="reviews__header">
          <span className="section-label">Отзывы</span>
          <h2 className="section-title">Что говорят клиенты</h2>
        </header>

        <div className="reviews__grid">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className="review-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="review-card__top">
                <img src={review.avatar} alt={review.name} className="review-card__avatar" loading="lazy" />
                <div className="review-card__info">
                  <h4 className="review-card__name">{review.name}</h4>
                  <p className="review-card__date">{review.date}</p>
                </div>
              </div>
              <Stars rating={review.rating} />
              <p className="review-card__comment">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="reviews__cta">
          <a
            href="https://t.me/barberco"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost btn--md"
          >
            Оставить отзыв в Telegram
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.2 4.4L2.4 11.7c-1.1.4-1.1 1.1-.2 1.4l4.8 1.5 1.9 5.8c.2.6.9.6 1.2.1l2.7-2.2 5.1 3.8c.9.5 1.6.1 1.8-.8l3.4-15.6c.4-1.7-.6-2.5-1.9-1.3zM9.6 14.5l-.4 4.2-1.8-5.6L18.6 7.2c.3-.2.1-.3-.2-.2L7.6 12.8l-4-1.3L20.4 5.5c.6-.2 1 .1.8.7L16.6 19.4c-.1.5-.4.6-.8.4l-5.2-3.8-2.4 2.3.4-3.8z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Reviews
