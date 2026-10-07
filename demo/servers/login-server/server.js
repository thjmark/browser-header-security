const express = require('express');
const { cookieOptions } = require('./headers');

const PORT = 4000;
const FRONTEND_ORIGIN = 'http://localhost:3000';
const COOKIE_NAME = 'session';
const ACCOUNT = { username: 'demo', password: 'demo' };

const app = express();
app.use(express.json());

// CORS so the real frontend (localhost:3000) can call this server and read
// the response. Fixed and correct from the start — not part of any exercise,
// login-server's exercise-relevant knobs are the cookie flags in headers.js.
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', FRONTEND_ORIGIN);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (username === ACCOUNT.username && password === ACCOUNT.password) {
    const value = `dummy-verify-string:${Date.now()}`;
    res.cookie(COOKIE_NAME, value, cookieOptions);
    return res.json({ ok: true });
  }
  res.status(401).json({ ok: false, error: 'invalid credentials' });
});

app.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`login-server listening on http://localhost:${PORT}`);
});
