import { useState } from 'react'
import './FAQ.scss'
import { faqItems } from '../../utils/data'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="faq scroll-offset">
      <div className="container">
        <h2 className="faq__title">Часто задаваемые вопросы</h2>

        <div className="faq__list">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-item__question"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span>{item.question}</span>
                <svg
                  className={`faq-item__arrow ${openIndex === index ? 'faq-item__arrow--open' : ''}`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div
                className={`faq-item__answer ${openIndex === index ? 'faq-item__answer--open' : ''}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ
