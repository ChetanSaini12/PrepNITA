import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import authRouter from './routes/auth.route.js'

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)

app.use(
  express.json({
    limit: '20kb',
  })
)

app.use(
  express.urlencoded({
    limit: '16kb',
    extended: true,
  })
)

app.use(express.static('public'))
app.use(cookieParser())

// ROUTING

app.use('/auth', authRouter)

export { app }
