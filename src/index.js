import { connectDB, closeDB } from './db.js'
import { NODE_ENV, HOST, PORT } from './config.js'
import app from './app.js'

const startServer = async () => {
  try {
    await connectDB()
    const server = app.listen(PORT, () => {
      console.log(`Server is running in ${NODE_ENV} mode on ${HOST}:${PORT}`)
    })
    // Handle server termination gracefully
    process.on('SIGINT', () => {
      server.close(() => {
        console.log('Express server closed')
        closeDB()
      })
    })
  } catch(err) {
    console.error('Failed to start the server:', err)
  }
}

startServer()

