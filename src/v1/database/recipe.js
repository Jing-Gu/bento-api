const db = require('./db.json');
const { saveToDb } = require('./utils');

const getAllRecipes = () => {
  try {
    return db.recipes;
  } catch(error) {
    throw { status: 500, message: error };
  }
}

const getRecipe = (recipeId) => {
  try {
    const recipe = db.recipes.find((recipe) => recipe.id === recipeId);
    if (!recipe) {
      throw { status: 400, message: 'Recipe not found' };
    }
    return recipe;
  } catch(error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

const createdRecipe = (newRecipe) => {
  try {
    const recipeAlreadyExists = db.recipes.find((recipe) => recipe.name === newRecipe.name);
    if (recipeAlreadyExists) {
      throw {
        status: 400,
        message: `Recipe with the name '${newRecipe.name}' already exists`,
      };
    }
    db.recipes.push(newRecipe);
    saveToDb(db);
    return newRecipe;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
}

const updateRecipe = (recipeId, update) => {
  try {
    const index = db.recipes.findIndex((recipe) => recipe.id === recipeId);
    if (index === -1) {
      throw { status: 400, message: 'Recipe not found' };
    }
    const updatedRecipe = {
      ...db.recipes[index],
      ...update,
      updatedAt: new Date().toLocaleString("en-US", {timeZone: "UTC"}),
    }

    db.recipes[index] = updatedRecipe;
    saveToDb(db);
    return updatedRecipe;
  } catch (error) {
    throw { status: error.status || 500, message: error?.message || error };
  }
}

const deleteRecipe = (recipeId) => {
  try {
    const index = db.recipes.findIndex((recipe) => recipe.id === recipeId);
  if (index === -1) {
    throw { status: 400, message: 'Recipe not found' };
  }
  db.recipes.splice(index, 1);
  saveToDb(db);
  } catch (error) {
    throw { status: error.status || 500, message: error?.message || error };
  }
}

module.exports = {
  getAllRecipes,
  getRecipe,
  createdRecipe,
  updateRecipe,
  deleteRecipe
};