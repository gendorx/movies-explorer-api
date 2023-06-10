const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 30,
    minlength: 2,
  },
  email: {
    type: String,
    validate: isEmail,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userScheme);
