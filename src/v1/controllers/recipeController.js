const recipeService = require('../services/recipeService');

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await recipeService.getAllRecipes();
    res.status(200).send({status: 'OK', data: allRecipes});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }
}

const getRecipe = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      status: 'BAD_REQUEST',
      data: { message: 'Missing recipeId' }
    });
    return
  }
  try {
    const recipe = await recipeService.getRecipe(req.params.id);
    res.status(200).send({status: 'OK', data: recipe});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }
}

const createRecipe = async (req, res) => {
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
    instructions: req.body.instructions,
    tags: req.body.tags,
    createdAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
  }
  try {
    const createdRecipe = await recipeService.createRecipe(newRecipe);
    res.status(201).send({status: 'OK', data: createdRecipe});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }
}

const updateRecipe = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      status: 'BAD_REQUEST',
      data: { message: 'Missing recipeId' }
    });
    return
  }
  try {
    const updatedRecipe = await recipeService.updateRecipe(req.params.id, req.body);
    res.status(200).send({status: 'OK', data: updatedRecipe});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }
}

const deleteRecipe = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      status: 'BAD_REQUEST',
      data: { message: 'Missing recipeId' }
    });
    return
  }
  try {
    await recipeService.deleteRecipe(req.params.id);
    res.status(204).send({status: 'OK'});
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }
}

const deleteAllRecipes = async() => {
  try {
    await recipeService.deleteAllRecipes()
  } catch(error) {
    res.status(error.status || 500).send({status: 'ERROR', data: error.message || error});
  }
}

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  deleteAllRecipes
}