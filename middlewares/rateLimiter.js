const rateLimit = require('express-rate-limit');

const { requestMax, perRequestsMs } = require('../configs');

const limitter = rateLimit({
  windowMs: perRequestsMs,
  max: requestMax,
});

module.exports = limitter;
