import mongoose from 'mongoose'

const IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 20,
    trim: true,
    unique: true
  }
})

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 10,
    trim: true,
    lowercase: true,
    unique: true
  }
})

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 100,
    trim: true,
    required: true,
    unique: true,
  },
  ingredients: {
    type: [{
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
      },
      amount: {
        type: Number,
        min: 1
      },
      unit: {
        type: String,
      },
    }],
    required: true,
    validate: [
      {
        validator: function (array) {
          return array.length <= 50
        },
        message: 'Ingredients array exceeds maximum length of 50 items.'
      }
    ]
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  instructions: {
    type: String,
  },
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
const Recipe = mongoose.model('Recipe', RecipeSchema, 'recipes')
const Ingredient = mongoose.model('Ingredient', IngredientSchema, 'ingredients')
const Tag = mongoose.model('Tag', TagSchema, 'tags')

export { Recipe, Ingredient, Tag }