require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors: celebrateErrors } = require('celebrate');
const mongoose = require('mongoose');

const { host, port, mongoUrl } = require('./configs');
const router = require('./routes');

const errorHandler = require('./middlewares/errorHandler');
const limitter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
});

// Middlewares
app.use(requestLogger);
app.use(helmet());
app.use(limitter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

app.listen(port, host);
