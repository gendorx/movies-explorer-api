const {
  constants: { HTTP_STATUS_INTERNAL_SERVER_ERROR },
} = require('http2');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, _next) {
  const {
    statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR,
    message = 'На сервера произошла ошибка',
  } = err;

  return res.status(statusCode).send({ message });
}

module.exports = errorHandler;
