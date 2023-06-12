const {
  Error: { ValidationError, CastError },
} = require('mongoose');

const User = require('../models/user');
const { NotFound, BadRequest } = require('../configs/errors');

async function getCurrentUser(req, res, next) {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) throw new NotFound('пользователь не найден');

    res.send(user);
  } catch (err) {
    if (err instanceof CastError) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

async function updateUser(req, res, next) {
  const userId = req.user.id;

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      runValidators: true,
      new: true,
    });

    if (!user) throw new NotFound('пользователь не найден');

    res.send(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      next(new BadRequest('переданы некорректные данные'));
    } else {
      next(err);
    }
  }
}

module.exports = { getCurrentUser, updateUser };
