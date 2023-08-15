const jwt = require('jsonwebtoken');

const { AuthError } = require('../configs/errors');
const { jwtSecret } = require('../configs');

const requiredAuthMessage = 'Требуется авторизация';

function authHandler(req, _res, next) {
  let authorization = req.get('authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(requiredAuthMessage));
    return;
  }

  authorization = authorization.replace('Bearer ', '');

  try {
    req.user = jwt.verify(authorization, jwtSecret);
    next();
  } catch (err) {
    next(new AuthError(requiredAuthMessage));
  }
}

module.exports = authHandler;
