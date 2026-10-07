# Security Headers Workshop

A small workshop for learning web security headers, focused on:
- Same-Origin Policy (SOP) and CORS
- Content Security Policy (CSP)

## Structure

- `presentation/` — slides and talking points. Carries the conceptual/background narrative (why SOP exists, how CORS preflight works, what CSP directives mean) rather than step-by-step exercise instructions.
- `demo/` — hands-on demo project. Full design lives in `demo/Architecture.md`; exercise instructions live in `demo/exercises/*.md`.

## Demo at a glance

Four Node.js/Express servers, each its own origin, built so participants
watch an attack succeed, then fix it themselves by editing one `headers.js`
file per server (route/business logic never changes):

| Server | Origin | Role |
|---|---|---|
| `login-server` | `http://localhost:4000` | issues the session cookie; owns `SameSite`/`HttpOnly`/`Secure` |
| `api-server` | `http://localhost:4001` | list `GET`/`POST`, gated by the session cookie; owns CORS headers |
| `frontend-server` | `http://localhost:3000` | "Secret Messageboard" UI (static files + vanilla JS `fetch()`); owns CSP |
| `evil-server` | `http://127.0.0.1:5000` | attacker demos (CORS read, CSRF, XSS payload, image beacon) + `/captured` viewer |

Four exercises, in this fixed order — CORS data leak → CSRF write → cookie
exfiltration (`HttpOnly`) → stored XSS (CSP `script-src`). The order is load-bearing,
see gotcha #6 below. Full attack/fix detail, endpoints, and auth model: `demo/Architecture.md`.

## Key technical gotchas learned while designing this (don't rediscover these)

1. **`SameSite` cares about "site" (registrable domain), not full origin.** `localhost:3000`, `:4000`, `:4001` all count as the *same site* despite being different origins for CORS/SOP purposes. evil-server must run on a genuinely different host (`127.0.0.1`) or the `SameSite` fix won't actually block it in the demo.
2. **Modern browsers default to `SameSite=Lax` when unspecified.** The vulnerable baseline must *explicitly* set `SameSite=None; Secure`, otherwise the "before" state may already partially block CSRF depending on browser/version — making the demo unreliable.
3. **`Secure` cookies work over plain HTTP on `localhost`/`127.0.0.1`** — browsers treat both as secure contexts, so no real TLS is needed anywhere in this demo.
4. **CORS vs CSRF is the core "aha" of this workshop:** CORS only blocks *reading* a cross-origin response — it never blocks the request from being *sent*. A misconfigured CORS policy leaks data; a missing/wrong `SameSite` is what allows CSRF writes. Two different headers, two different problems, commonly conflated.
5. **Tightening CSP's `connect-src` can break the legitimate app, not just the attack** — the real frontend calls `login-server`/`api-server` cross-origin via `fetch()`, so `connect-src` must explicitly allowlist both origins.
6. **Exercise order is constrained: the CSP `script-src` fix must come last.** If applied earlier, the stored-XSS payload can never execute, leaving nothing to demonstrate for the `HttpOnly` exfiltration exercise — that exercise relies on the XSS still being live to show `HttpOnly` as defense-in-depth.

## Other design decisions worth knowing

- Auth is deliberately trivial/insecure (fixed `demo`/`demo` account, unsigned `dummy-verify-string:<timestamp>` cookie value checked locally by `api-server`) — this workshop teaches headers, not session security, so that mechanism is intentionally a non-issue.
- Each exercise is independently seeded/verifiable (participants plant any needed stored-XSS entry manually via the real login) rather than chained to earlier exercises staying broken — more robust for a live, possibly out-of-order workshop session.
- `demo/solutions/` holds only the corrected `headers.js` files as a fallback reference, not full server copies.
- CSRF-token (as a stronger alternative to `SameSite`) and output-encoding (as an alternative to CSP for the XSS exercise) are both deliberately deferred/out of scope — see "Deferred" section in `demo/Architecture.md`.

## Status

Architecture documented in `demo/Architecture.md` and implemented: all four
servers, `exercises/*.md`, and `solutions/` exist under `demo/`. From
`demo/`, run `npm install` once, then `npm run start:all`.
