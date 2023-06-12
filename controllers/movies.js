const {
  constants: { HTTP_STATUS_CREATED },
} = require('http2');
const {
  Error: { ValidationError, CastError },
} = require('mongoose');

const Movie = require('../models/movie');
const { NotFound, BadRequest, ForbiddenError } = require('../configs/errors');

async function getMovies(_req, res, next) {
  try {
    const movies = await Movie.find({}).populate('owner');

    res.status(HTTP_STATUS_CREATED).send(movies);
  } catch (err) {
    next(err);
  }
}

async function createMovie(req, res, next) {
  const userId = req.user.id;

  try {
    const movie = await (await Movie.create({ ...req.body, owner: userId })).populate(
      'owner',
    );

    res.send(movie);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function deleteMovie(req, res, next) {
  const movieId = req.params.id;
  const userId = req.user.id;

  try {
    const movie = await Movie.findById(movieId).populate('owner');

    if (!movie) throw new NotFound('фильм не найден');
    if (!movie.owner._id.equals(userId)) {
      throw new ForbiddenError('невозможно удалить чужой фильм');
    }

    await movie.deleteOne();

    res.send(movie);
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

module.exports = { getMovies, createMovie, deleteMovie };
