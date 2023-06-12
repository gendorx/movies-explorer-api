const jwt = require('jsonwebtoken');

const { AuthError } = require('../configs/errors');
const { jwtSecret } = require('../configs');

const requiredAuthMessage = 'Требуется авторизация';

function authHandler(req, _res, next) {
  const { jwt: token } = req.cookies;

  if (!token) {
    next(new AuthError(requiredAuthMessage));
    return;
  }

  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch (err) {
    next(new AuthError(requiredAuthMessage));
  }
}

module.exports = authHandler;
