const mongoose = require('mongoose');
const { urlRegex } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Введите страну создания фильма'],
  },
  director: {
    type: String,
    required: [true, 'Введите режиссера фильма'],
  },
  duration: {
    type: Number,
    required: [true, 'Введите длительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Введите год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Введите описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Введите ссылку на постер к фильму'],
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введена некорректная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Введите ссылку на трейлер фильма'],
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введена некорректная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Введите ссылку на миниатюрное изображение постера к фильму'],
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введена некорректная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userId',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Введите название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Введите название фильма на английском языке'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
