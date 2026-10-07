const express = require('express');
const cookieParser = require('cookie-parser');
const corsHeaders = require('./headers');

const PORT = 4001;
const COOKIE_NAME = 'session';
const MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

const app = express();
app.use(express.json());
// The CSRF demo (exercise 2) posts a plain-text body on purpose: a
// Content-Type of application/json triggers a CORS preflight, which would
// block the request from even being *sent* once exercise 1 is fixed. A
// text/plain body is a CORS "simple request" — it's always sent; only
// *reading the response* is subject to CORS. That distinction is the point
// of exercise 2.
app.use(express.text({ type: 'text/plain' }));
app.use(cookieParser());
app.use(corsHeaders);

let messages = [];

function requireSession(req, res, next) {
  const value = req.cookies[COOKIE_NAME];
  if (!value || !value.startsWith('dummy-verify-string:')) {
    return res.status(401).json({ ok: false, error: 'not authenticated' });
  }
  const issuedAt = Number(value.split(':')[1]);
  if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > MAX_AGE_MS) {
    return res.status(401).json({ ok: false, error: 'session expired' });
  }
  next();
}

app.get('/list', requireSession, (req, res) => {
  res.json({ ok: true, messages });
});

app.post('/list', requireSession, (req, res) => {
  const text = typeof req.body === 'string' ? req.body : req.body && req.body.text;
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ ok: false, error: 'text is required' });
  }
  messages.push({ id: Date.now(), text, createdAt: new Date().toISOString() });
  res.json({ ok: true, messages });
});

// Unsecured debug/demo-reset endpoint — deliberately not gated by requireSession.
app.delete('/list', (req, res) => {
  messages = [];
  res.json({ ok: true, messages });
});

app.listen(PORT, () => {
  console.log(`api-server listening on http://localhost:${PORT}`);
});
