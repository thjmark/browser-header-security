// EDIT THIS FILE to complete exercises 2 (CSRF) and 3 (cookie exfiltration).
// Nothing else in login-server changes for either exercise.
//
// Vulnerable baseline:
//   - sameSite: 'none'  -> exercise 2 (CSRF): change to 'lax'
//   - httpOnly: false   -> exercise 3 (cookie exfiltration): change to true
//
// `secure: true` is intentionally left alone — it isn't part of either
// exercise, and works fine over plain HTTP here because browsers treat
// localhost/127.0.0.1 as secure contexts.
module.exports = {
  cookieOptions: {
    httpOnly: false,
    secure: true,
    sameSite: 'none',
  },
};
