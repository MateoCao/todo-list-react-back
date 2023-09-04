import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { tasksRouter } from './routes/tasks.js'
import { authRouter } from './routes/auth.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'

const app = express()
app.use(json())
app.disable('x-powered-by')
app.use(cookieParser())
app.set('trust proxy', 1)

app.use(corsMiddleware())

app.use('/tasks', tasksRouter)
app.use('/user', authRouter)

export default app
