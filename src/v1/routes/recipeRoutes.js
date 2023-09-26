const express = require('express');
const recipeController = require('../controllers/recipeController');

const router = express.Router();

router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipe);
router.post('/', recipeController.createRecipe);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);
router.delete('/', recipeController.deleteAllRecipes);

module.exports = router;