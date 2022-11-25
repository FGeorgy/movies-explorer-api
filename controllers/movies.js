const Movie = require('../models/movie');
const BadRequestError = require('../utils/errors/bad-request-error');
const NotFoundError = require('../utils/errors/not-found-error');
const ForbiddenError = require('../utils/errors/forbidden-error');
const { CREATED } = require('../utils/statusErrors');
const {
  INVALID_DATA,
  MOVIE_NOT_FOUND,
  VALIDATION_ERROR,
  FORBIDDEN,
  SUCCESS,
  CAST_ERROR,
} = require('../utils/messagesErrors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(CREATED).send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(INVALID_DATA));
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND);
      }
      if (JSON.stringify(movie.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenError(FORBIDDEN);
      }
      return Movie.remove(movie);
    })
    .then(() => res.status(200).send({ message: SUCCESS }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError());
        return;
      }
      next(err);
    });
};
