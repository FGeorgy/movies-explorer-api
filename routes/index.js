const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { login, createUser, logout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validator');
const NotFoundError = require('../utils/errors/not-found-error');
const { NOT_FOUND } = require('../utils/messagesErrors');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.post('/signout', logout);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
});

module.exports = router;
