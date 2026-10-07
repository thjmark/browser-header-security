// EDIT THIS FILE to complete exercise 4 (stored XSS / CSP).
// Nothing else in frontend-server changes.
//
// Vulnerable baseline: no Content-Security-Policy header at all, so any
// injected <script> in a message-board entry runs freely.
//
// Fix:
//   Content-Security-Policy: default-src 'self'; script-src 'self'; connect-src 'self' http://localhost:4000 http://localhost:4001
//
// `connect-src` must explicitly allow login-server and api-server: the real
// frontend's own JS calls both cross-origin with fetch(). Without this, CSP
// breaks the legitimate app too, not just the attack.
module.exports = function cspHeaders(req, res, next) {
  next();
};
