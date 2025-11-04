import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => res.json({ ok: true, service: 'shoplite-backend' }))
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/shoplite'

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`API on http://localhost:${PORT}`))
})


