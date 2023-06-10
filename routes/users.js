const express = require('express');

const users = express.Router();

users.get('/me', () => {});
users.patch('/me', () => {});

module.exports = users;
