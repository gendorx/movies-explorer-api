const express = require('express');

const usersRouter = require('./users');
const movieRouter = require('./movies');

const router = express.Router();

router.use('/users', usersRouter);
router.use('/movies', movieRouter);

module.exports = router;
