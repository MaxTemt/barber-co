import './Toast.scss'

function Toast({ message, visible }) {
  return (
    <div className={`toast ${visible ? 'visible' : ''}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: '10px', flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" stroke="#4CAF50" strokeWidth="2"/>
        <path d="M8 12l3 3 5-5" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      {message}
    </div>
  )
}

export default Toast
