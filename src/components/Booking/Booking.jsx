import { useState, useEffect, useRef } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import IMask from 'imask'
import './Booking.scss'
import { services, masters, timeSlots, addons } from '../../utils/data'

function Booking({ onBookingSuccess }) {
  const [selectedService, setSelectedService] = useState(services[0])
  const [selectedMaster, setSelectedMaster] = useState(masters[0])
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedAddons, setSelectedAddons] = useState([])
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const phoneRef = useRef(null)

  // IMask для телефона
  useEffect(() => {
    if (phoneRef.current) {
      const mask = IMask(phoneRef.current, {
        mask: '+{7} (000) 000-00-00',
        lazy: false
      })
      return () => mask.destroy()
    }
  }, [])

  // Расчёт итоговой цены
  const totalPrice = selectedService.price + 
    selectedAddons.reduce((sum, addonId) => {
      const addon = addons.find(a => a.id === addonId)
      return sum + (addon ? addon.price : 0)
    }, 0)

  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev =>
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    )
  }

  // Валидация
  const validate = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя'
    }
    
    const phoneValue = phoneRef.current?.value || formData.phone
    if (!phoneValue || phoneValue.replace(/\D/g, '').length < 11) {
      newErrors.phone = 'Введите корректный номер телефона'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email'
    }
    
    if (!selectedDate) {
      newErrors.date = 'Выберите дату'
    }
    
    if (!selectedTime) {
      newErrors.time = 'Выберите время'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedService.name,
          master: selectedMaster.name,
          date: selectedDate ? selectedDate.toLocaleDateString('ru-RU') : '',
          time: selectedTime,
          addons: selectedAddons,
          totalPrice,
          ...formData
        })
      })

      if (!response.ok) {
        throw new Error('Ошибка сервера')
      }

      onBookingSuccess()
      
      // Сброс формы
      setSelectedService(services[0])
      setSelectedMaster(masters[0])
      setSelectedDate(null)
      setSelectedTime('')
      setSelectedAddons([])
      setFormData({ name: '', phone: '', email: '' })
      setErrors({})
    } catch (error) {
      console.error('Ошибка отправки:', error)
      setSubmitError('Не удалось отправить заявку. Попробуйте позже или свяжитесь с нами по телефону.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section id="booking" className="booking scroll-offset">
      <div className="container">
        <h2 className="booking__title">Запись онлайн</h2>
        <p className="booking__subtitle">Выберите услугу, мастера и удобное время</p>

        <div className="booking__grid">
          {/* Калькулятор */}
          <div className="booking__calculator">
            <div className="booking__field">
              <label className="booking__label">Услуга</label>
              <select
                className="booking__select"
                value={selectedService.id}
                onChange={e => {
                  const service = services.find(s => s.id === Number(e.target.value))
                  setSelectedService(service)
                }}
              >
                {services.map(s => (
                  <option key={s.id} value={s.id}>{s.name} — {s.price} ₽</option>
                ))}
              </select>
            </div>

            <div className="booking__field">
              <label className="booking__label">Мастер</label>
              <select
                className="booking__select"
                value={selectedMaster.id}
                onChange={e => {
                  const master = masters.find(m => m.id === Number(e.target.value))
                  setSelectedMaster(master)
                }}
              >
                {masters.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.experience}, ★ {m.rating})</option>
                ))}
              </select>
            </div>

            <div className="booking__field">
              <label className="booking__label">Дата</label>
              <Flatpickr
                value={selectedDate}
                onChange={dates => setSelectedDate(dates[0])}
                options={{
                  minDate: 'today',
                  dateFormat: 'd.m.Y',
                  locale: { firstDayOfWeek: 1 }
                }}
                className={`booking__datepicker ${errors.date ? 'booking__input--error' : ''}`}
                placeholder="Выберите дату"
              />
              {errors.date && <span className="booking__error">{errors.date}</span>}
            </div>

            <div className="booking__field">
              <label className="booking__label">Время</label>
              <select
                className={`booking__select ${errors.time ? 'booking__select--error' : ''}`}
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
              >
                <option value="">Выберите время</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.time && <span className="booking__error">{errors.time}</span>}
            </div>

            <div className="booking__field">
              <label className="booking__label">Дополнительные услуги</label>
              <div className="booking__addons">
                {addons.map(addon => (
                  <label key={addon.id} className="booking__addon">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => handleAddonToggle(addon.id)}
                    />
                    <span>{addon.name} (+{addon.price} ₽)</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="booking__total">
              <span className="booking__total-label">Итого:</span>
              <span className="booking__total-price" id="total-price">{totalPrice} ₽</span>
            </div>
          </div>

          {/* Форма */}
          <form className="booking__form" onSubmit={handleSubmit}>
            {submitError && <div className="booking__submit-error">{submitError}</div>}
            <div className="booking__field">
              <label className="booking__label">Ваше имя</label>
              <input
                type="text"
                name="name"
                className={`booking__input ${errors.name ? 'booking__input--error' : ''}`}
                placeholder="Имя"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => {
                  if (!formData.name.trim()) setErrors(prev => ({ ...prev, name: 'Введите ваше имя' }))
                }}
              />
              {errors.name && <span className="booking__error">{errors.name}</span>}
            </div>

            <div className="booking__field">
              <label className="booking__label">Телефон</label>
              <input
                ref={phoneRef}
                type="tel"
                name="phone"
                className={`booking__input ${errors.phone ? 'booking__input--error' : ''}`}
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span className="booking__error">{errors.phone}</span>}
            </div>

            <div className="booking__field">
              <label className="booking__label">Email</label>
              <input
                type="email"
                name="email"
                className={`booking__input ${errors.email ? 'booking__input--error' : ''}`}
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  if (formData.email && !emailRegex.test(formData.email)) {
                    setErrors(prev => ({ ...prev, email: 'Введите корректный email' }))
                  }
                }}
              />
              {errors.email && <span className="booking__error">{errors.email}</span>}
            </div>

            <button
              type="submit"
              className="booking__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Booking
