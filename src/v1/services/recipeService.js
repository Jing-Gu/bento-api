const Recipe = require('../models/recipe');

const getAllRecipes = async () => {
  try {
    return await Recipe.find().exec()
  } catch(error) {
    throw new Error({ status: 500, message: 'db error:' + error?.message || error });
  }
}

const getRecipe = async (recipeId) => {
  try {
    return await Recipe.findById(recipeId).exec()
  } catch(error) {
    throw new Error({ status: 500, message: 'db error:' + error?.message || error });
  }
}

const createRecipe = async (added) => {
  try {
    const recipeAlreadyExists = Recipe.find({name: added.name});
    if (recipeAlreadyExists) {
      throw {
        status: 400,
        message: `Recipe with the name '${added.name}' already exists`,
      };
    }
    const newRecipe = new Recipe(added);
    await newRecipe.save();
    return newRecipe;
  } catch (error) {
    throw new Error({ status: 500, message: 'db error:' + error?.message || error });
  }
}

const updateRecipe = async (recipeId, update) => {
  try {
    return await Recipe.findByIdAndUpdate(recipeId, update, {new: true})
  } catch(error) {
    throw new Error({ status: 500, message: 'db error:' + error?.message || error });
  }
}

const deleteRecipe = async (recipeId) => {
  try {
    return await Recipe.findByIdAndRemove(recipeId)
  } catch(error) {
    throw new Error({ status: 500, message: 'db error:' + error?.message || error });
  }
}

const deleteAllRecipes = async () => {
  try {
    return await Recipe.deleteMany({})
  } catch(error) {
    throw new Error({ status: 500, message: 'db error:' + error?.message || error });
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