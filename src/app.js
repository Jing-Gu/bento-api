import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import logger from 'morgan'
import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import swaggerUi from 'swagger-ui-express'
import api from './api.js'

const app = express()
const __dirname = path.dirname(new URL(import.meta.url).pathname)
//should set like this?
//app.set('env', process.env.NODE_ENV)
app.use(express.static(path.join(__dirname, 'public'), { redirect: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(logger('dev'))
app.use(api)


try {
  // Read the YAML file as a string
  const yamlString = fs.readFileSync('./swagger.yaml', 'utf8')
  // Parse the YAML string into a JavaScript object
  const swaggerDef = yaml.load(yamlString)

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDef))
} catch (error) {
  console.error('Error loading Swagger definition:', error)
}

export default app