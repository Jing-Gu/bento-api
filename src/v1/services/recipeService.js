import { Recipe, Ingredient, Tag } from '../models/recipe.js'
import mongoose from 'mongoose'

const getAllRecipes = async () => {
  try {
    return await Recipe.find().populate('ingredients.item tags').exec()
  } catch(error) {
    throw 'Failed to retrieve the recipes. Please try again later.'
  }
}

const getRecipe = async (recipeId) => {
  try {
    const recipe = await Recipe.findById(recipeId).populate('ingredients.item tags').exec()
    if (!recipe) {
      throw 'Recipe not found.'
    } else {
      return recipe
    }
  } catch(error) {
    throw error
  }
}

const createRecipe = async (added) => {
  try {
    const recipeAlreadyExists = await Recipe.find({name: added.name})
    if (recipeAlreadyExists && recipeAlreadyExists.length > 0) {
      throw `Recipe with the name '${added.name}' already exists`
    }

    const ingredients = []
    const tagIds = []

    for (const ingred of added.ingredients) {
      let ingredientId
      const existingIngredient = await Ingredient.findOne({ name: ingred.name })
      if (existingIngredient) {
        ingredientId = existingIngredient._id
      } else {
        const newIngredient = new Ingredient({name: ingred.name})
        await newIngredient.save()
        ingredientId = newIngredient._id
      }
      ingredients.push({
        item: ingredientId,
        amount: ingred.amount,
        unit: ingred.unit
      })
    }

    for (const tag of added.tags) {
      const existingTag = await Tag.findOne({ name: tag.name })
      if (existingTag) {
        tagIds.push(existingTag._id)
      } else {
        const newTag = new Tag({name: tag.name})
        await newTag.save()
        tagIds.push(newTag._id)
      }
    }

    const newRecipe = new Recipe({
      name: added.name,
      ingredients: ingredients,
      tags: tagIds,
      instructions: added.instructions,
    })

    await newRecipe.save()
    return newRecipe
  } catch (error) {
    throw error
  }
}

const updateRecipe = async (recipeId, update) => {
  try {
    const ingredients = []
    const tagIds = []

    for (const ingred of update.ingredients) {
      let ingredientId
      const existingIngredient = await Ingredient.findOne({ name: ingred.name })
      if (existingIngredient) {
        ingredientId = existingIngredient._id
      } else {
        const newIngredient = new Ingredient({ name: ingred.name })
        await newIngredient.save()
        ingredientId = newIngredient._id
      }
      ingredients.push({
        item: ingredientId,
        amount: ingred.amount,
        unit: ingred.unit
      })
    }

    for (const tag of update.tags) {
      let tagId
      const existingTag = await Tag.findOne({ name: tag.name })
      if (existingTag) {
        tagId = existingTag._id
      } else {
        const newTag = new Tag({ name: tag.name })
        await newTag.save()
        tagId = newTag._id
      }
      tagIds.push(tagId)
    }

    const recipe = await Recipe.findById(recipeId)

    if (!recipe) {
      throw 'Recipe not found.'
    }
    recipe.name = update.name
    recipe.ingredients = ingredients
    recipe.tags = tagIds
    recipe.instructions = update.instructions

    await recipe.save()
    return recipe
  } catch(error) {
    if (error instanceof mongoose.Error.CastError) {
      throw new Error("Data type casting error:", error.message)
    }
    throw error
  }
}

const deleteRecipe = async (recipeId) => {
  try {
    return await Recipe.findByIdAndRemove(recipeId)
  } catch(error) {
    if (error instanceof mongoose.Error.CastError) {
      throw new Error(`Unable to delete. Recipe with ID ${recipeId} not found.`)
    }
    throw error
  }
}

const deleteAllRecipes = async () => {
  try {
    return await Recipe.deleteMany({})
  } catch(error) {
    if (error.code === 13) { // MongoDB error code for permission denied
      throw new Error("Permission denied. You are not authorized to delete recipes.")
    }
    throw new Error("An error occurred while deleting recipes.")
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

export default recipeService