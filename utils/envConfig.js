require('dotenv').config();

const {
  MONGO_LINK = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
} = process.env;

module.exports = {
  MONGO_LINK, PORT,
};
