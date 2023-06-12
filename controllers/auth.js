const {
  constants: { HTTP_STATUS_CREATED },
} = require('http2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { AuthError, ConfictError } = require('../configs/errors');
const { jwtSecret } = require('../configs');
const User = require('../models/user');

const authErrorMessage = 'передан неверный логин или пароль';

async function createUser(req, res, next) {
  const { password, ...query } = req.body;

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ ...query, password: hashPassword });

    res.status(HTTP_STATUS_CREATED).send({ ...user.toJSON(), password: undefined });
  } catch (err) {
    if (err.code === 11000) {
      next(
        new ConfictError(
          'указанная электронная почта уже была использована при регистрации',
        ),
      );
    } else {
      next(err);
    }
  }
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select({ password: 1 });

    if (!user) throw new AuthError(authErrorMessage);

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) throw new AuthError(authErrorMessage);

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });

    res.cookie('jwt', token, { httpOnly: true });

    res.send({ ...user.toJSON(), password: undefined });
  } catch (err) {
    next(err);
  }
}

module.exports = { createUser, loginUser };
