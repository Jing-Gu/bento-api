const recipeService = require('../services/recipeService');

const getAllRecipes = (req, res) => {
  try {
    const allRecipes = recipeService.getAllRecipes();
    res.send({status: 'OK', data: allRecipes});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }
}

const getRecipe = (req, res) => {
  const recipeId = req.params.id;
  if (!recipeId) {
    res.status(400).send({
      status: 'BAD_REQUEST',
      data: { message: 'Missing recipeId' }
    });
    return
  }
  try {
    const recipe = recipeService.getRecipe(recipeId);
    res.send({status: 'OK', data: recipe});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }
}

const createRecipe = (req, res) => {
  if (!req.body.name || !req.body.ingredients || !req.body.instructions) {
    res.status(400).send({
      status: 'BAD_REQUEST',
      data: {
        message: 'Missing one of the required fields: name, ingredients, instructions'
      }
    });
    return
  }
  const newRecipe = {
    name: req.body.name,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions
  }
  try {
    const createdRecipe = recipeService.createRecipe(newRecipe);
    res.status(201).send({status: 'OK', data: createdRecipe});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }
}

const updateRecipe = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      status: 'BAD_REQUEST',
      data: { message: 'Missing recipeId' }
    });
    return
  }
  try {
    const updateRecipe = recipeService.updateRecipe(req.params.id, req.body);
    res.send({status: 'OK', data: updateRecipe});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }

}

const deleteRecipe = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      status: 'BAD_REQUEST',
      data: { message: 'Missing recipeId' }
    });
    return
  }
  try {
    recipeService.deleteRecipe(req.params.id);
    res.status(204).send({status: 'OK'});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }

}

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
}