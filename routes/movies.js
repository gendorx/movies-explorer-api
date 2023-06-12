const express = require('express');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  moviesValidation: { createMovieQuery, deleteMovieQuery },
} = require('../configs/validation');

const movies = express.Router();

movies.get('/', getMovies);
movies.post('/', createMovieQuery, createMovie);
movies.delete('/:id', deleteMovieQuery, deleteMovie);

module.exports = movies;
