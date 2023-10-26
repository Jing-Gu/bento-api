import { Router } from 'express'
const router = Router()

router.get('/', (req, res) => {
  const apiInfo = {
    name: 'Bento API',
    version: 'v1',
    description: 'See available endpoints below.',
    endpoints: {
      recipes: '/api/v1/recipes',
    },
  };
  res.json(apiInfo)
})

export default router