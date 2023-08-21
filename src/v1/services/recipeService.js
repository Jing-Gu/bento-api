const { v4: uuid } = require('uuid')
const dbRecipes = require('../database/recipe.js');

const getAllRecipes = () => {
  try {
    return dbRecipes.getAllRecipes();
  } catch(error) {
    throw error;
  }
}

const getRecipe = (recipeId) => {
  try {
    return dbRecipes.getRecipe(recipeId);
  } catch(error) {
    throw error;
  }
}

const createRecipe = (newRecipe) => {
  const recipeToAdd = {
    ...newRecipe,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
    updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
  }
  try {
    return dbRecipes.createdRecipe(recipeToAdd);
  } catch(error) {
    throw error;
  }
}

const updateRecipe = (recipeId, update) => {
  try {
    return dbRecipes.updateRecipe(recipeId, update);
  } catch(error) {
    throw error;
  }
}

const deleteRecipe = (recipeId) => {
  try {
    dbRecipes.deleteRecipe(recipeId);
  } catch(error) {
    throw error;
  }
}

module.exports = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe
}