const express = require('express');

const { NotFound } = require('../configs/errors');

const usersRouter = require('./users');
const movieRouter = require('./movies');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/movies', movieRouter);

router.all('*', (_req, _res, next) => {
  next(new NotFound('неверный адрес запроса'));
});

module.exports = router;
