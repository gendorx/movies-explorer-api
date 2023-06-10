const {
  PORT, HOST, JWT_SECRET, NODE_ENV,
} = process.env;

module.exports = {
  isProduction: NODE_ENV === 'production',
  host: HOST || '127.0.0.1',
  port: PORT || 3000,
  jwtSecret: JWT_SECRET || 'axeaa12hah',
};
