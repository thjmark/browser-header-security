
---
## Content Security Policy

Die Content Security Policy zentralieriert viele Sicherheitseinstellungen für Webseiten

- CSP steuert:
  - welche Resourcen geladen, embedded oder ausgeführt werden können
  - typ der Seitenzugriffe e.g.  https only
  - enforce trusted types (alle unsicheren Senken müssen sanitized werden)
- CSP setzen über
  - html meta feld (nur im notfall) 
  - http header des html files e.g. Content-Security-Policy: default-src 'self';


---
layout: two-cols-header
---
# CSP Details

Grundlegende Struktur z.B.:
`Content-Security-Policy: default-src 'self'; img-src 'self' cdn.example.com;`

::left::
- Resources: Was wird kontrolliert?
    - default-src
    - img-src
    - script-src
    - style-src
    - object-src
::right::
- Ziele: Was darf verwendet werden ? (kann kombiniert werden)
    - none
    - self
    - nonce( set in html tag (integrity attribute) + header start with `'nonce-<base64>'`)
    - hash (start with `'sha256-<base64>`)
    - url based allow list
    - unsafe-inline....
    - 'strict-dynamic' (das script und alle scripte die von ihm geladen werden)
- Sonstiges
  - upgrade-insecure-request

(https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)

- die Konfiguration kann sehr kompliziert sein!
 -  mit Content-Security-Policy-Report-Only kann man sich nur die Fehler anzeigen lassen

---
# CSP experimental features

Trusted types
  - mit trusted types kann festgelegt werden das daten vor dem schreiben auf unsichere dom senke sanitized werden müssen
  - JS code registriert policy -> Funktion die aus sicht des Entwicklers sanitized html ausgibt
  - in CSP werden alle gültigen policies mitgeschickt.
  - wirft TypeError wenn unsanitized strings an unsichere DOM senken geschickt werden.
  - wird von frameworks wie angular(ab 11),react(ab 19.3), vue(ab 3.4) unterstützt trusted types 
    - policies sind teilweise unsicher

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for
---

# CSP: Sinnvolle Configuration

## Allgemein
- Im Moment wird empfohlen das dies nicht der einzige xss schutz ist (defense in depth)
- Immer upgrade-insecure-request wenn möglich
- setzen über Header

# Je nach Anwendung
- nur lokal: self
- sources werden kontrolliert: hash strict
- sources kommen von extern: nonce und strict-dynamic

- trusted type ist noch nicht in jedem Browser -> später  nötig in vanillajs projekten oder für frameworkentwickler

---

## Wogegen das Schützt Data leaks
  Beispiel:
  - in frontend können in den posts bilder eingebunden werden
  - ein Angreifer fügt einen Post hinzu der auf ein Bild auf dem bösen Server zeigt
  - über Bilderzugriff kann man den Zugriff von Usern des Forums messen
  - mit Content Security policy  img-src kann man das unterbinden


---
# Demo

Übung 3b
---

## Wogegen das Schützt XSS, Data leaks

   Beispiel:

  - frontend hat xss (führt alles aus nachrichten aus)
  - per xss kann man u.a. auch fremde scripte aufrufen oder ein externes bild aufrufen
  (damit kann man dann daten exfilteireren)
  - mit sicheren CSP headern kann man xss unterbinden

---

## Demo

Übung 4
---