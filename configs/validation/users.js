const { Joi, celebrate } = require('celebrate');

const commonFields = {
  email: Joi.string().required().email(),
  name: Joi.string().required().min(2).max(30),
  password: Joi.string().required(),
};

const createUserQuery = celebrate({
  body: Joi.object({
    email: commonFields.email,
    name: commonFields.name,
    password: commonFields.password,
  }),
});

const loginUserQuery = celebrate({
  body: Joi.object({
    email: commonFields.email,
    password: commonFields.password,
  }),
});

const updateUserQuery = celebrate({
  body: Joi.object({
    email: commonFields.email,
    name: commonFields.name,
  }),
});

module.exports = {
  createUserQuery,
  loginUserQuery,
  updateUserQuery,
};
