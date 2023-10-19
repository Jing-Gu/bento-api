import express from 'express'
import bodyParser from 'body-parser'
import recipeRoutes from './routes/recipeRoutes.js'
import { connectDB, closeDB } from './models/db.js'

import { NODE_ENV, HOST, PORT } from '../../config.js'

import fs from 'fs'
import yaml from 'js-yaml'
import swaggerUi from 'swagger-ui-express'

const app = express()
app.use(bodyParser.json())
app.use('/api/v1/recipes', recipeRoutes)

try {
  // Read the YAML file as a string
  const yamlString = fs.readFileSync('./swagger.yaml', 'utf8')
  // Parse the YAML string into a JavaScript object
  const swaggerDef = yaml.load(yamlString)

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDef))
} catch (error) {
  console.error('Error loading Swagger definition:', error)
}

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

