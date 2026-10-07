// Corrected frontend-server/headers.js (exercise 4).
module.exports = function cspHeaders(req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; connect-src 'self' http://localhost:4000 http://localhost:4001"
  );
  next();
};
