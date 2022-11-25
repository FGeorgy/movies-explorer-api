const { celebrate, Joi } = require('celebrate');
const { isUrl } = require('validator');

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (isUrl(value)) {
        return value;
      }
      return helpers.message('Поле image заполнено некорректно');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (isUrl(value)) {
        return value;
      }
      return helpers.message('Поле trailerLink заполнено некорректно');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (isUrl(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail заполнено некорректно');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
