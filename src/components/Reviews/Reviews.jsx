import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Reviews.scss'
import { reviews } from '../../utils/data'

function Stars({ rating }) {
  return (
    <div className="review-card__stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`star ${i < rating ? 'star--active' : ''}`}>★</span>
      ))}
    </div>
  )
}

function Reviews() {
  return (
    <section id="reviews" className="reviews scroll-offset">
      <div className="container">
        <h2 className="reviews__title">Отзывы клиентов</h2>
        <p className="reviews__subtitle">Нам доверяют более 2500 клиентов</p>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 }
          }}
          className="reviews__swiper"
        >
          {reviews.map(review => (
            <SwiperSlide key={review.id}>
              <div className="review-card">
                <div className="review-card__header">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="review-card__avatar"
                    loading="lazy"
                  />
                  <div className="review-card__info">
                    <h4 className="review-card__name">{review.name}</h4>
                    <span className="review-card__date">{review.date}</span>
                  </div>
                </div>

                <Stars rating={review.rating} />

                <p className="review-card__comment">{review.comment}</p>

                <div className="review-card__actions">
                  <button className="review-card__like" aria-label="Нравится">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" stroke="#444" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="reviews__telegram">
          <a
            href="https://t.me/barberco_bot?start=review"
            target="_blank"
            rel="noopener noreferrer"
            className="reviews__telegram-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
              <path d="M21.2 4.4L2.4 11.5c-.6.2-.6.8 0 1l4.8 1.5 1.8 5.8c.1.4.6.5.9.2l2.6-2.6 5.1 3.8c.5.3 1.1.1 1.2-.5L22.6 5.4c.2-.7-.4-1.3-1.4-1zM9.6 13.4l-.4 4.2-1.3-4.2L18.2 7 9.6 13.4z"/>
            </svg>
            Оставить отзыв в Telegram
          </a>
        </div>
      </div>
    </section>
  )
}

export default Reviews
