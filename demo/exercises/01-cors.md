# Exercise 1 — CORS data leak

## Goal

Fix `api-server` so a different origin can no longer **read** your session's
message list.

## Setup

1. From `demo/`, run `npm install` once, then `npm run start:all` to bring up
   all four servers.
2. Open the real app at http://localhost:3000 and log in (`demo` / `demo`).
3. Post at least one message so there's something worth stealing.

## Watch the attack succeed

1. In the same browser (so the session cookie is available), open
   http://127.0.0.1:5000/steal in a new tab.
2. The page fetches `http://localhost:4001/list` with your credentials and
   prints whatever it gets back.
3. You should see your real message list rendered on evil-server's page.
4. Check http://127.0.0.1:5000/captured — a `cors-read` entry is logged.

## Why this works

`demo/servers/api-server/headers.js` reflects *any* `Origin` header straight
back in `Access-Control-Allow-Origin` and sets
`Access-Control-Allow-Credentials: true`. That tells the browser "any site,
even with your cookies, may read this response" — including evil-server.

## Fix it

Edit `demo/servers/api-server/headers.js`. Replace the reflected origin with
the one real origin that should be allowed:

```js
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
```

Remove the `req.headers.origin` reflection entirely — the vulnerability is
the reflection itself, not the specific value it falls back to. Restart
`api-server` (or the whole stack) to pick up the change.

## Confirm the fix

1. Reload http://localhost:3000 — login, list, and posting should all still
   work normally.
2. Reload http://127.0.0.1:5000/steal — the fetch now fails in the browser
   (check the console for a CORS error), and the page shows nothing useful
   was read.

## Key takeaway

CORS headers control who may **read** a cross-origin response. They say
nothing about whether the request is sent, or whether a write happens on the
server — that's exercise 2.
