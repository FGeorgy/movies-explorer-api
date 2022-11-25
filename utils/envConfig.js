require('dotenv').config();

const {
  MONGO_URL = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
} = process.env;

module.exports = {
  MONGO_URL, PORT,
};
