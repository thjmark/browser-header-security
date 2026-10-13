---
theme: default
title: Security Headers Workshop
info: |
  ## Security Headers Workshop
  Same-Origin Policy, CORS, and Content Security Policy.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---

# Der Browser ist dein Freund

Wie Browser Sicherheitsfunktionen Webapplikationen sicherer machen
Same-Origin Policy, CORS, Content Security Policy und andere Header

<div class="pt-12">
  <span class="opacity-75">Press Space to continue</span>
</div>

---
# Agenda
- Websicherheit - eine kurze Übersicht
- Was hat sich schon verbessert
- Was muss man konfigurieren um diese Funktionen zu nutzen und was für Probleme fangen wir damit überhaupt ab
  - SOP, CORS
    - Data leak (CORS)
    - CSRF
  - CSP
    - Xss
      - local xss block
      - signierung von file js code
      - einmalpasswort/nonce
    - andere Kontrollen im CSP z.B. image src
      - Data leak
  - sonstige Empfehlungen

(Jeweils eine Erklärung)
- Demo des Angriffs
- Übung
---

# Webapps und ihre gefahren
## Typische Angriffe
- session stealing
- Data leak
- XSS
- XEE
- CSRF
- Click jacking
- man in the middle

---
# Sicherheitsfeatures des Browsers 
- eine kurze Geschichte der Browsersicherheit
	- http-> https
    - HSTS
	- Header sicherheit (Gruppen)
    - Same Origin/ CORS
    - Content Security Policy
    - Sonstige Header
	- Fortgeschrittenes Sandboxing: COEP, CORP
  - ein paar Worte zu Cookies

---

- same origin und was soll das mit dem blöden CORS Fehler
	- `Access-Control-Allow-Origin` (default same site) (definiert von datenserver von welcher seite die Daten abgegriffen werden) 
	wichtig: PORT ist auch wichtig

  Wie funktioniert der Mechanismus

	- SOP default
	- CORS 
		- (DEMO?)
	- sonsige CORS ähnliche

---

# Same origin: Wogegen hilft das

z.B.

- CORS Data leak

---

Cookie speichrung/ Ein paar worte zu session
- SET Cookie (e.g. login cookie (can be used for session fixation) )
	-  secure
	- http only
	- same site
	- domain, path
	- expire and mage age
	- (no local storage(for security relevant information))


---
# Wogegen hilft das

CSRF
---


- Die Content security policy
	- Formen
		- Strict
			- nonce
			- hash
		- strict dynamic
	- übersicht was kann ich alles steuern
	- z.B. child-src(frames), connect-src(fetch ziele), img-src,font-src,... script-src(was javascript can) (man kann auch festlegen von wo welcher js code ausgeführt werden kann), default-src (sandbox), wer wohin navigieren kann, welche interaktion wohin gemeldet wird, require-trusted-types-for 'script'
	- Ziele ort, nonce, hash
	- Trusted Types API
	- Sinnvolle basics
	- zeige man kann die CSP testen
	- DEMO was bewirkt die CSP
	- DEMO CSP mit React/Angular oder vue

---

# CSP Wogegen hilft es:

- XSS
- Clickjacking
- data exfiltration
- ....

---

## Sonstige header 
	- X-Frame Options (CSP ist besser)
	- X-XSS-Protection:0 (ist veraltet)
	- `X-Content-Type-Options: nosniff`
	- `Referrer-Policy: strict-origin-when-cross-origin`
	- `Content-Type: text/html; charset=UTF-8`
	- Cache-Control (no-store for sensitive data)
	- `Cross-Origin-Opener-Policy: same-origin`
	- `Cross-Origin-Embedder-Policy: require-corp`
	- `Cross-Origin-Resource-Policy: same-site`
	- `Permissions-Policy: geolocation=(), camera=(), microphone=()`
	- `X-DNS-Prefetch-Control: off`
  -  Sonstige header die noch relevant sein könnten (caching,, x-robots...)


- Quellen security sachen für webseiten
- OWASP Cheat sheets

---

# Agenda

- Same-Origin Policy (SOP) — what it is, what it protects, common misconceptions
- CORS — how it relaxes SOP, preflight requests, headers involved, common misconfigurations
- Content Security Policy (CSP) — mitigating XSS, directive overview, nonces/hashes, reporting
- Live demo — four servers, four exercises

---
layout: section
---

# Same-Origin Policy

---

# Same-Origin Policy (SOP)

What it is, what it protects, common misconceptions

<!--
Talking points go here.
-->

---
layout: section
---

# CORS

---

# CORS

How it relaxes SOP, preflight requests, headers involved, common misconfigurations

<!--
Talking points go here.
-->

---
layout: section
---

# Content Security Policy

---

# Content Security Policy (CSP)

Mitigating XSS, directive overview, nonces/hashes, reporting

<!--
Talking points go here.
-->

---
layout: center
class: text-center
---

# Demo time

See `demo/` for the hands-on exercises
