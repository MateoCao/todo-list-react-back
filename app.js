import express, { json } from 'express'
import { tasksRouter } from './routes/tasks.js'
import { corsMiddleware } from './middlewares/cors.js'
import { mongoose } from 'mongoose'
import 'dotenv/config'

const app = express()
app.use(json())
app.disable('x-powered-by')

app.use(corsMiddleware())

app.use('/tasks', tasksRouter)

const PORT = process.env.PORT ?? 1235

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.pbjm7vt.mongodb.net/todolist-API?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Connected to database')
    app.listen(PORT, () => {
      console.log(`server listening on port http://localhost:${PORT}`)
    })
  }).catch((error) => {
    console.log(error)
  })
