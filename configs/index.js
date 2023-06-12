const {
  PORT,
  HOST,
  JWT_SECRET,
  NODE_ENV,
  MONGO_URL,
  REQUESTS_MAX,
  PER_REQUESTS_MIN,
} = process.env;

module.exports = {
  isProduction: NODE_ENV === 'production',
  host: HOST || '127.0.0.1',
  port: PORT || 3000,
  jwtSecret: JWT_SECRET || 'axeaa12hah',
  mongoUrl: MONGO_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb',
  requestMax: REQUESTS_MAX ? Number(REQUESTS_MAX) : 100,
  perRequestsMs: (PER_REQUESTS_MIN ? Number(PER_REQUESTS_MIN) : 15) * 60 * 1000,
};
