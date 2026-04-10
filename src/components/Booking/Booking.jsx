import { useState, useEffect, useRef } from 'react'
import './Booking.scss'
import { services, masters, timeSlots, addons } from '../../utils/data'

function Booking({ onBookingSuccess }) {
  const [step, setStep] = useState(1)
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

  useEffect(() => {
    if (phoneRef.current) {
      const mask = phoneRef.current
      const handleInput = () => {
        let val = mask.value.replace(/\D/g, '')
        if (!val.startsWith('7')) val = '7' + val
        if (val.length > 11) val = val.slice(0, 11)
        let formatted = '+7'
        if (val.length > 1) formatted += ' (' + val.slice(1, 4)
        if (val.length > 4) formatted += ') ' + val.slice(4, 7)
        if (val.length > 7) formatted += '-' + val.slice(7, 9)
        if (val.length > 9) formatted += '-' + val.slice(9, 11)
        mask.value = formatted
      }
      mask.addEventListener('input', handleInput)
      mask.value = '+7'
      return () => mask.removeEventListener('input', handleInput)
    }
  }, [])

  const totalPrice = selectedService.price +
    selectedAddons.reduce((sum, id) => {
      const addon = addons.find(a => a.id === id)
      return sum + (addon?.price || 0)
    }, 0)

  const handleAddonToggle = (id) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Введите имя'
    if ((formData.phone?.replace(/\D/g, '') || '').length < 11) e.phone = 'Введите номер'
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRe.test(formData.email)) e.email = 'Введите email'
    if (!selectedDate) e.date = 'Выберите дату'
    if (!selectedTime) e.time = 'Выберите время'
    setErrors(e)
    return Object.keys(e).length === 0
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
          date: selectedDate?.toLocaleDateString('ru-RU') || '',
          time: selectedTime,
          addons: selectedAddons,
          totalPrice,
          ...formData
        })
      })
      if (!response.ok) throw new Error('Ошибка сервера')
      onBookingSuccess()
      setSelectedService(services[0])
      setSelectedMaster(masters[0])
      setSelectedDate(null)
      setSelectedTime('')
      setSelectedAddons([])
      setFormData({ name: '', phone: '', email: '' })
      setErrors({})
      setStep(1)
    } catch (err) {
      console.error('Ошибка отправки:', err)
      setSubmitError('Не удалось отправить заявку. Попробуйте позже или позвоните нам.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  // Get today's date in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0]
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const steps = ['Услуга', 'Дата и время', 'Данные']

  return (
    <section id="booking" className="booking scroll-offset">
      <div className="container">
        <header className="booking__header">
          <span className="section-label">Запись</span>
          <h2 className="section-title">Записаться онлайн</h2>
          <p className="section-subtitle">Выберите услугу, мастера и удобное время</p>
        </header>

        {/* Step indicator */}
        <div className="booking__steps">
          {steps.map((label, i) => (
            <button
              key={label}
              className={`booking__step ${step === i + 1 ? 'booking__step--active' : ''} ${step > i + 1 ? 'booking__step--done' : ''}`}
              onClick={() => { if (step > i + 1) setStep(i + 1) }}
            >
              <span className="booking__step-num">{step > i + 1 ? '✓' : i + 1}</span>
              <span className="booking__step-label">{label}</span>
            </button>
          ))}
        </div>

        <div className="booking__grid">
          {/* Step 1: Service & Master */}
          {step === 1 && (
            <div className="booking__panel">
              <div className="booking__field">
                <label className="booking__label">Услуга</label>
                <select
                  className="booking__select"
                  value={selectedService.id}
                  onChange={e => setSelectedService(services.find(s => s.id === Number(e.target.value)))}
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name} — {s.price.toLocaleString()} ₽</option>
                  ))}
                </select>
              </div>

              <div className="booking__field">
                <label className="booking__label">Мастер</label>
                <select
                  className="booking__select"
                  value={selectedMaster.id}
                  onChange={e => setSelectedMaster(masters.find(m => m.id === Number(e.target.value)))}
                >
                  {masters.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.experience}, ★ {m.rating})</option>
                  ))}
                </select>
              </div>

              <div className="booking__addons">
                <label className="booking__label">Дополнительно</label>
                {addons.map(addon => (
                  <label key={addon.id} className="booking__addon">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => handleAddonToggle(addon.id)}
                    />
                    <span>{addon.name} <small>+{addon.price} ₽</small></span>
                  </label>
                ))}
              </div>

              <div className="booking__total">
                <span>Итого:</span>
                <strong>{totalPrice.toLocaleString()} ₽</strong>
              </div>

              <button className="btn btn--primary" onClick={() => setStep(2)} style={{ width: '100%', marginTop: 16 }}>
                Далее
              </button>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 2 && (
            <div className="booking__panel">
              <div className="booking__field">
                <label className="booking__label">Дата</label>
                <input
                  type="date"
                  className={`booking__input ${errors.date ? 'booking__input--error' : ''}`}
                  value={selectedDate ? new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().split('T')[0] : ''}
                  onChange={e => { setSelectedDate(new Date(e.target.value)); if (errors.date) setErrors(p => ({...p, date: ''})) }}
                  min={today}
                  max={maxDate}
                />
                {errors.date && <span className="booking__error">{errors.date}</span>}
              </div>

              <div className="booking__field">
                <label className="booking__label">Время</label>
                <div className="booking__slots">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      className={`booking__slot ${selectedTime === time ? 'booking__slot--active' : ''} ${errors.time && !selectedTime ? 'booking__slot--error' : ''}`}
                      onClick={() => { setSelectedTime(time); if (errors.time) setErrors(p => ({...p, time: ''})) }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.time && <span className="booking__error">{errors.time}</span>}
              </div>

              <div className="booking__nav">
                <button className="btn btn--ghost" onClick={() => setStep(1)}>Назад</button>
                <button className="btn btn--primary" onClick={() => { if (selectedDate && selectedTime) setStep(3); else setErrors({ date: !selectedDate ? 'Выберите дату' : '', time: !selectedTime ? 'Выберите время' : '' }) }}>
                  Далее
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact info */}
          {step === 3 && (
            <div className="booking__panel">
              {submitError && <div className="booking__submit-error">{submitError}</div>}

              {/* Summary */}
              <div className="booking__summary">
                <div className="booking__summary-row">
                  <span>Услуга</span>
                  <strong>{selectedService.name}</strong>
                </div>
                <div className="booking__summary-row">
                  <span>Мастер</span>
                  <strong>{selectedMaster.name}</strong>
                </div>
                <div className="booking__summary-row">
                  <span>Дата</span>
                  <strong>{selectedDate?.toLocaleDateString('ru-RU')}</strong>
                </div>
                <div className="booking__summary-row">
                  <span>Время</span>
                  <strong>{selectedTime}</strong>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="booking__summary-row">
                    <span>Доп.</span>
                    <strong>{selectedAddons.map(id => addons.find(a => a.id === id)?.name).join(', ')}</strong>
                  </div>
                )}
                <div className="booking__summary-row booking__summary-total">
                  <span>Итого</span>
                  <strong>{totalPrice.toLocaleString()} ₽</strong>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="booking__field">
                  <label className="booking__label">Имя</label>
                  <input
                    type="text"
                    name="name"
                    className={`booking__input ${errors.name ? 'booking__input--error' : ''}`}
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
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
                    placeholder="+7 (999) 123-45-67"
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
                  />
                  {errors.email && <span className="booking__error">{errors.email}</span>}
                </div>

                <div className="booking__nav">
                  <button type="button" className="btn btn--ghost" onClick={() => setStep(2)}>Назад</button>
                  <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Booking
