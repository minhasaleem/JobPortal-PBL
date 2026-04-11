import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node"
import { clerkWebHooks } from './controllers/webhooks.js'
import companyRoutes from './routes/CompanyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { clerkMiddleware } from '@clerk/express'
import adminRoutes from './routes/adminRoutes.js'

const app = express()

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://job-portal-pbl-client.vercel.app"
  ],
  credentials: true
}))

app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API working"))

app.post('/webhooks', clerkWebHooks)

app.use('/api/company', companyRoutes)
app.use('/api/jobs', clerkMiddleware(), jobRoutes)
app.use('/api/users', clerkMiddleware(), userRoutes)
app.use('/api/admin', adminRoutes)

// Error handler
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack)
  res.status(500).send("Something broke!")
})

Sentry.setupExpressErrorHandler(app)

// Start server
const PORT = process.env.PORT || 5000

const startServer = async () => {
  try {
    await connectDB()
    console.log("✅ DB Connected")

    await connectCloudinary()
    console.log("✅ Cloudinary Connected")

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })

  } catch (error) {
    console.error("❌ Server start failed:", error)
  }
}

startServer()

