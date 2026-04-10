import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs/promises'
import crypto from 'crypto'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Admin API token authentication
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || crypto.randomUUID()
console.log(`🔑 Admin token: ${ADMIN_TOKEN}`)
console.log('   Set ADMIN_TOKEN in .env for production!')

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Требуется авторизация' })
  }
  next()
}

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from dist
app.use(express.static(join(__dirname, '../dist')))

// Data file path
const DATA_FILE = join(__dirname, 'bookings.json')

// Ensure bookings file exists
async function ensureDataFile() {
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2))
  }
}

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// POST /api/bookings - Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      service,
      master,
      date,
      time,
      addons,
      totalPrice,
      name,
      phone,
      email
    } = req.body

    // Validation
    if (!service || !master || !date || !time || !name || !phone || !email) {
      return res.status(400).json({
        error: 'Все обязательные поля должны быть заполнены'
      })
    }

    // Phone validation
    const phoneClean = phone.replace(/\D/g, '')
    if (phoneClean.length < 11) {
      return res.status(400).json({
        error: 'Некорректный номер телефона'
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Некорректный email'
      })
    }

    // Create booking object
    const booking = {
      id: Date.now().toString(),
      service,
      master,
      date,
      time,
      addons: addons || [],
      totalPrice,
      name,
      phone,
      email,
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    // Read existing bookings
    await ensureDataFile()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const bookings = JSON.parse(data)

    // Add new booking
    bookings.push(booking)

    // Save
    await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2))

    // Log booking (in production, send email/Telegram notification)
    console.log('📋 New booking:', {
      id: booking.id,
      name,
      service,
      master,
      date,
      time
    })

    // TODO: Send Telegram notification to admin
    // await sendTelegramNotification(booking)

    // TODO: Send confirmation email to client
    // await sendConfirmationEmail(booking)

    res.status(201).json({
      success: true,
      booking: {
        id: booking.id,
        name: booking.name,
        service: booking.service,
        date: booking.date,
        time: booking.time
      }
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    res.status(500).json({
      error: 'Внутренняя ошибка сервера'
    })
  }
})

// GET /api/bookings - Get all bookings (admin only)
app.get('/api/bookings', authenticateAdmin, async (req, res) => {
  try {
    await ensureDataFile()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const bookings = JSON.parse(data)
    res.json(bookings)
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения данных' })
  }
})

// GET /api/bookings/:id - Get single booking
app.get('/api/bookings/:id', async (req, res) => {
  try {
    await ensureDataFile()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const bookings = JSON.parse(data)
    const booking = bookings.find(b => b.id === req.params.id)

    if (!booking) {
      return res.status(404).json({ error: 'Запись не найдена' })
    }

    res.json(booking)
  } catch (error) {
    res.status(500).json({ error: 'Ошибка чтения данных' })
  }
})

// DELETE /api/bookings/:id - Delete booking (admin only)
app.delete('/api/bookings/:id', authenticateAdmin, async (req, res) => {
  try {
    await ensureDataFile()
    const data = await fs.readFile(DATA_FILE, 'utf-8')
    const bookings = JSON.parse(data)
    const filtered = bookings.filter(b => b.id !== req.params.id)

    if (filtered.length === bookings.length) {
      return res.status(404).json({ error: 'Запись не найдена' })
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2))
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Ошибка удаления' })
  }
})

// SPA fallback - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Barber & Co server running on http://localhost:${PORT}`)
  console.log(`📋 API: http://localhost:${PORT}/api/health`)
})

export default app
