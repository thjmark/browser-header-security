# Exercise 2 — CSRF write

## Goal

Stop evil-server from writing to your message board using your logged-in
session — even though (after exercise 1) it already can't read the response.

## Setup

All four servers running, logged in at http://localhost:3000 as `demo`/`demo`.

## Watch the attack succeed

1. Note how many messages are currently on the board at http://localhost:3000.
2. In the same browser, open http://127.0.0.1:5000/csrf in a new tab. It
   silently POSTs a new message to `api-server` on load.
3. The page can't show you the result directly (the response is unreadable —
   CORS again, assuming exercise 1's fix is in place). Reload
   http://localhost:3000 instead: a new `csrf-planted-message ...` entry is
   there. The write succeeded even though evil-server never got to see the
   response.
4. Check http://127.0.0.1:5000/captured — a `csrf-post` entry is logged (an
   "attempt", since evil-server can't itself confirm success).

## Why this works

`demo/servers/login-server/headers.js` sets the session cookie with
`SameSite=None; Secure`. `SameSite=None` tells the browser "send this cookie
on cross-site requests too" — so when evil-server's page silently POSTs to
`api-server`, your browser attaches your session cookie, and `api-server`
treats the request as coming from you.

This is independent of CORS: CORS only decided whether evil-server could
*read* the response. The write already happened the moment the request was
sent.

## Fix it

Edit `demo/servers/login-server/headers.js`:

```js
sameSite: 'lax',
```

Restart `login-server` (or the whole stack), then **log in again** — the fix
only applies to newly issued cookies, not the one your browser already has.

## Confirm the fix

1. Note the current message count on http://localhost:3000.
2. Revisit http://127.0.0.1:5000/csrf.
3. Reload http://localhost:3000 — no new message was added. `api-server`
   responded `401` because no session cookie arrived with the cross-site
   request at all.

## Key takeaway

CORS and `SameSite` solve two different problems. CORS: "can this origin
*read* my response?" `SameSite`: "should this cookie be *sent* on a
cross-site request at all?" A correct CORS policy with a loose `SameSite`
still leaves you open to CSRF writes.
