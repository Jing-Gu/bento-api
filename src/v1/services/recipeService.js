import Recipe from '../models/recipe.js';
import mongoose from 'mongoose';

const getAllRecipes = async () => {
  try {
    return await Recipe.find();
  } catch(error) {
    throw 'Failed to retrieve the recipes. Please try again later.';
  }
}

const getRecipe = async (recipeId) => {
  try {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      throw 'Recipe not found.';
    } else {
      return recipe
    }
  } catch(error) {
    throw error;
  }
}

const createRecipe = async (added) => {
  try {
    const recipeAlreadyExists = await Recipe.find({name: added.name});
    if (recipeAlreadyExists && recipeAlreadyExists.length > 0) {
      throw `Recipe with the name '${added.name}' already exists`;
    }
    const newRecipe = new Recipe(added);
    await newRecipe.save();
    return newRecipe;
  } catch (error) {
    throw error;
  }
}

const updateRecipe = async (recipeId, update) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(recipeId, update, {new: true, runValidators: true});
    if (!recipe) {
      throw 'Recipe not found.';
    }
    return recipe
  } catch(error) {
    if (error instanceof mongoose.Error.CastError) {
      throw new Error(`Recipe with ID ${recipeId} not found.`);
    }
    throw error;
  }
}

const deleteRecipe = async (recipeId) => {
  try {
    return await Recipe.findByIdAndRemove(recipeId)
  } catch(error) {
    if (error instanceof mongoose.Error.CastError) {
      throw new Error(`Unable to delete. Recipe with ID ${recipeId} not found.`);
    }
    throw error
  }
}

const deleteAllRecipes = async () => {
  try {
    return await Recipe.deleteMany({})
  } catch(error) {
    if (error.code === 13) { // MongoDB error code for permission denied
      throw new Error("Permission denied. You are not authorized to delete recipes.");
    }
    throw new Error("An error occurred while deleting recipes.");
  }
}

const recipeService = {
  getAllRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  deleteAllRecipes
}

export default recipeService;