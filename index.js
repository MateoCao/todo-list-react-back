import mongoose from 'mongoose'
import 'dotenv/config'
import app from './app.js'

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
