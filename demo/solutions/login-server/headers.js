// Corrected login-server/headers.js (exercises 2 and 3 both applied).
module.exports = {
  cookieOptions: {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  },
};
