const express = require('express');

const { createUser, loginUser } = require('../controllers/auth');
const {
  usersValidation: { loginUserQuery, createUserQuery },
} = require('../configs/validation');

const movies = express.Router();

movies.post('/signup', createUserQuery, createUser);
movies.post('/signin', loginUserQuery, loginUser);

module.exports = movies;
