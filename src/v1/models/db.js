const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6';

const connectDB = () => {
  try {
   mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Event listeners for various connection events
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to:', url);
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected from MongoDB');
    });

    // Listen for the Node.js process termination event
    process.on('SIGINT', () => {
      closeDB('app termination');
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

const closeDB = async (msg) => {
  try {
    await mongoose.connection.close();
    console.log('Gracefully shutdown through:' + msg);
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1); // Non-zero exit code to indicate an error
  }
};

module.exports = { connectDB, closeDB };