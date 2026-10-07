// EDIT THIS FILE to complete exercise 1 (CORS data leak).
// Nothing else in api-server changes.
//
// Vulnerable baseline: reflects whatever Origin sent the request and allows
// credentials — ANY origin (including evil-server) can read the response.
//
// Fix: respond with one fixed, exact origin instead of reflecting the
// request's Origin header:
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// (Remove the reflection entirely — the vulnerability is the reflection
// itself, not the specific fallback value.)
module.exports = function corsHeaders(req, res, next) {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin); // VULNERABLE: reflects any origin
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
};
