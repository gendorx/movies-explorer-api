const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const commonFields = {
  email: Joi.string().custom((value) => {
    const isEmail = validator.isEmail(value);

    if(!isEmail) throw new Error('email is invalid');

    return value;
  }),
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
