const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});