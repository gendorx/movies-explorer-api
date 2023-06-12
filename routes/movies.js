const express = require('express');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const movies = express.Router();

movies.get('/', getMovies);
movies.post('/', createMovie);
movies.delete('/:id', deleteMovie);

module.exports = movies;
