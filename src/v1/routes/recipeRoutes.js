import express from 'express';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipe);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
router.delete('/', recipeController.deleteAllRecipes);

//module.exports = router;
export default router