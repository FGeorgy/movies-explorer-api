require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { UNAUTHORIZED } = require('../utils/messagesErrors');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorization = req.cookies.token;

  if (!authorization) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }

  let payload;

  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError(UNAUTHORIZED);
  }

  req.user = payload;

  next();
};
