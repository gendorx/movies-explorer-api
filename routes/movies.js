const express = require('express');

const movies = express.Router();

movies.get('/', () => {});
movies.post('/', () => {});
movies.delete('/:id', () => {});

module.exports = movies;
