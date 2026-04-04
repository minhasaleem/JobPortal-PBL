// // import dotenv from "dotenv";
// // dotenv.config();
// import './config/instrument.js'
// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from './config/db.js'
// import * as Sentry from "@sentry/node"
// import {clerkWebHooks} from './controllers/webhooks.js'
// import companyRoutes from './routes/CompanyRoutes.js'
// import connectCloudinary from './config/cloudinary.js'
// import jobRoutes from './routes/jobRoutes.js'
// import userRoutes from './routes/userRoutes.js'
// import {clerkMiddleware} from '@clerk/express'


// process.on("uncaughtException", (err) => {
//   console.error("💥 Uncaught Exception:", err)
// })

// process.on("unhandledRejection", (err) => {
//   console.error("💥 Unhandled Rejection:", err)
// })

// // console.log(process.env.CLOUDINARY_NAME);

// //Initialize Express
// const app = express()

// //Connect to database
// // await connectDB()
// // await connectCloudinary()

// //Middlewares
// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }))
// app.use(express.json())
// // app.use(clerkMiddleware())

// //Routes
// app.get('/',(req,res)=>res.send("API working"))
// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });
// app.post('/webhooks',clerkWebHooks)
// app.use('/api/company',companyRoutes)
// app.use('/api/jobs',clerkMiddleware(),jobRoutes)
// app.use('/api/users',clerkMiddleware(), userRoutes)


// // ✅ ADD GLOBAL ERROR HANDLER RIGHT HERE 👇
// app.use((err, req, res, next) => {
//   console.error("🔥 GLOBAL ERROR:", err.stack)
//   res.status(500).send("Something broke!")
// })

// //Port
// const PORT = process.env.PORT || 5000

// Sentry.setupExpressErrorHandler(app);

// // app.listen( PORT,()=>{
// //     console.log(`Server is running on port ${PORT}`)
// // })

// // await connectDB()
// // await connectCloudinary()

// // app.listen(PORT, () => {
// //     console.log(`Server is running on port ${PORT}`)
// // })
// const startServer = async () => {
//   try {
//     await connectDB()
//     console.log("✅ DB Connected")

//     await connectCloudinary()
//     console.log("✅ Cloudinary Connected")

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`)
//     })

//   } catch (error) {
//     console.error("❌ Server start failed:", error)
//   }
// }

// startServer()
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

const app = express()

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send("API working"))

app.post('/webhooks', clerkWebHooks)

app.use('/api/company', companyRoutes)
app.use('/api/jobs', clerkMiddleware(), jobRoutes)
app.use('/api/users', clerkMiddleware(), userRoutes)

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

