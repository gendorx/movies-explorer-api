const express = require('express');

const { getCurrentUser, updateUser } = require('../controllers/users');

const users = express.Router();

users.get('/me', getCurrentUser);
users.patch('/me', updateUser);

module.exports = users;
