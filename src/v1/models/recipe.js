import mongoose from 'mongoose';

// Define the data schema (sub schema)
const IngredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 20,
    trim: true,
    required: true,
  },
  amount: {
    type: Number,
    min: 1
  },
  unit: {
    type: String,
  }
})

// Define the data schema
const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
    trim: true,
    required: true,
    unique: true,
  },
  ingredients: {
    type: [IngredientsSchema],
    validate: [
      {
        validator: function (array) {
          return array.length <= 50
        },
        message: 'Ingredients array exceeds maximum length of 50 items.'
      }
    ]
  },
  instructions: {
    type: String,
  },
  tags: [{
    type: String,
    lowercase: true,
  }],
  createdAt: {
    type: Date,
    'default': Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
  }
});

// Compile the schema into a model
const Recipe = mongoose.model('Recipe', RecipeSchema, 'recipes');

export default Recipe;