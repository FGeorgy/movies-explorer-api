const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/loggers');
const errorHandler = require('./middlewares/errors');
const rateLimiter = require('./middlewares/rateLimiter');
const { MONGO_URL, PORT } = require('./utils/envConfig');
const cors = require('./middlewares/cors');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
});

const app = express();

app.use(cors);

app.use(requestLogger);
app.use(rateLimiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
