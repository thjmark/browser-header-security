# Demo / Practice Project

Hands-on exercises for the workshop attendees. Full design: `Architecture.md`.

## Running it

```sh
npm install      # once
npm run start:all
```

This brings up all four servers:

| Server | URL |
|---|---|
| login-server | http://localhost:4000 |
| api-server | http://localhost:4001 |
| frontend-server (the app) | http://localhost:3000 |
| evil-server (attacker) | http://127.0.0.1:5000 |

Open http://localhost:3000 and log in with `demo` / `demo`.

## Exercises

Work through `exercises/01-cors.md` → `02-csrf.md` → `03-exfiltration.md` →
`04-xss.md`, in that order (the order is load-bearing — see
`Architecture.md`). Each exercise has you edit exactly one `headers.js` file
under `servers/*/`; restart the relevant server (or the whole stack) after
each edit. `solutions/` holds the corrected `headers.js` files as a fallback
reference if you get stuck.
