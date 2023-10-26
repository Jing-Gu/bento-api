import { Router } from 'express'
import apiRoutes from './v1/routes/apiRoutes.js'
import recipeRoutes from './v1/routes/recipeRoutes.js'

const api = Router()

api.use('/api/v1', apiRoutes)
api.use('/api/v1/recipes', recipeRoutes)

export default api