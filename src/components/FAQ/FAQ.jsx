import { useState } from 'react'
import './FAQ.scss'
import { faqItems } from '../../utils/data'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="faq scroll-offset">
      <div className="container">
        <header className="faq__header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Частые вопросы</h2>
        </header>

        <div className="faq__list">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'faq-item--open' : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <button className="faq-question">
                <span>{item.question}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className={`faq-chevron ${openIndex === i ? 'faq-chevron--open' : ''}`}
                >
                  <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="faq-answer-wrapper">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
