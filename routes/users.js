const express = require('express');

const { getCurrentUser, updateUser } = require('../controllers/users');
const {
  usersValidation: { updateUserQuery },
} = require('../configs/validation');

const users = express.Router();

users.get('/me', getCurrentUser);
users.patch('/me', updateUserQuery, updateUser);

module.exports = users;
