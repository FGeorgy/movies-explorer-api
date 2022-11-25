require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const BadRequestError = require('../utils/errors/bad-request-error');
const NotFoundError = require('../utils/errors/not-found-error');
const ConflictError = require('../utils/errors/conflict-error');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { CREATED } = require('../utils/statusErrors');
const {
  USER_NOT_FOUND,
  USER_CONFLICT_ERROR,
  VALIDATION_ERROR,
  INVALID_DATA,
  SUCCESS,
  INCORRECT_LOGIN,
} = require('../utils/messagesErrors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(USER_NOT_FOUND);
      }
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((data) => {
      res.status(CREATED).send({
        name: data.name,
        email: data.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_CONFLICT_ERROR));
        return;
      }
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(INVALID_DATA));
        return;
      }
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(USER_CONFLICT_ERROR));
        return;
      }
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(INVALID_DATA));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ message: SUCCESS });
    })
    .catch(() => next(new UnauthorizedError(INCORRECT_LOGIN)));
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('token').send({ message: SUCCESS });
  next();
};
