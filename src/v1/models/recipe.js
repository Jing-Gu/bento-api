const mongoose = require('mongoose');

// Define the data schema (sub schema)
const IngredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 10
  },
  amount: {
    type: Number,
    min: 1
  },
  unit: {
    type: String,
    max: 1
  }
})

// Define the data schema 
const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 100
  },
  ingredients: [IngredientsSchema],
  instructions: {
    type: String,
  },
  tags: [{
    type: String,
    lowercase: true,
    max: 3
  }],
  createdAt: {
    type: Date,
    'default': Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    'default': Date.now,
  }
});

// Compile the schema into a model
const Recipe = mongoose.model('Recipe', RecipeSchema, 'recipes');

module.exports = Recipe;