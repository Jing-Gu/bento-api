require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');

const { connectDB, closeDB } = require('./models/db');


const app = express();

app.use(bodyParser.json());
app.use("/api/v1/recipes", recipeRoutes);

const startServer = async () => {
  try {

    await connectDB();
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
    // Handle server termination gracefully
    process.on('SIGINT', () => {
      server.close(() => {
        console.log('Express server closed');
        closeDB();
      });
    });
  } catch(err) {
    console.error('Failed to start the server:', err);
  }
}

startServer();
