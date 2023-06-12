const { Joi, celebrate } = require('celebrate');

const commonFields = {
  id: Joi.string().required().hex().length(24),
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.number().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().required(),
  trailerLink: Joi.string().uri().required(),
  thumbnail: Joi.string().uri().required(),
  movieId: Joi.number().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
};

const createMovieQuery = celebrate({
  body: Joi.object({
    country: commonFields.country,
    director: commonFields.director,
    duration: commonFields.duration,
    year: commonFields.year,
    description: commonFields.description,
    image: commonFields.image,
    trailerLink: commonFields.trailerLink,
    nameRU: commonFields.nameRU,
    nameEN: commonFields.nameEN,
    thumbnail: commonFields.thumbnail,
    movieId: commonFields.movieId,
  }),
});

const deleteMovieQuery = celebrate({
  params: Joi.object({
    id: commonFields.id,
  }),
});

module.exports = { createMovieQuery, deleteMovieQuery };
