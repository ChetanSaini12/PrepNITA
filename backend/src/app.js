import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import authRouter from './routes/auth.route.js'
import { expressMiddleware } from '@apollo/server/express4'
import { createApolloGraphqlServer } from './graphql/index.js'
import { decodeToken } from './utils/decodeToken.js'

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

app.get('/', (req, res) =>
  res.status(200).json({ msg: 'Server is responding' })
)

app.use('/auth', authRouter)

app.use(
  '/graphql',
  expressMiddleware(await createApolloGraphqlServer(), {
    context: async ({ req }) => {
      const token = req.headers.authorization || ''
      if (!token) return {}
      // console.log('TOKEN : ', token)
      const userId = decodeToken(token)
      // console.log('USER ID : ', userId)
      return {
        userId,
      }
    },
  })
)

export { app }
