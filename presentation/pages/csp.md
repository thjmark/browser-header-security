---

## Content Security Policy

Die Content Security Policy zentralisiert viele Sicherheitseinstellungen für Webseiten

- CSP steuert:
  - welche Resourcen geladen, embedded oder ausgeführt werden können
  - Typ der Seitenzugriffe e.g.  https only
  - enforce trusted types (alle unsicheren Senken müssen sanitized werden)
- CSP setzen über
  - html meta feld (nur im Notfall) 
  - Http-Header des Html-Files e.g. Content-Security-Policy: default-src 'self';



---

# CSP Details 1

Grundlegende Struktur z.B.:
`Content-Security-Policy: default-src 'self'; img-src 'self' cdn.example.com;`

- Allgemein
  - upgrade-insecure-requests
- Resources: Was wird kontrolliert?
    - default-src
    - img-src
    - script-src
    - style-src
    - object-src
---

# CSP Details 2
- Ziele: Was darf verwendet werden ? (kann kombiniert werden)
    - none
    - self
    - nonce( set in html tag (nonce attribute) + header start with `'nonce-<base64>'`)
    - hash (start with `'sha256-<base64>`)
    - url based allow list
    - unsafe-inline....
    - 'strict-dynamic' (das script und alle scripte die von ihm geladen werden)


Konfiguration kann sehr kompliziert sein!

Zum Debuggen: `Content-Security-Policy-Report-Only` Fehler loggen aber nicht blocken

---
# CSP Trusted types

Trusted types
  - mit trusted types kann festgelegt werden das daten vor dem schreiben auf unsichere dom senke sanitized werden müssen
  - JS code registriert policy -> Funktion die aus sicht des Entwicklers sanitized html ausgibt
  - in CSP werden alle gültigen policies mitgeschickt.
  - wirft TypeError wenn unsanitized strings an unsichere DOM senken geschickt werden.
  - wird von frameworks wie angular(ab 11),react(ab 19.3), vue(ab 3.4) unterstützt trusted types 
    - policies sind teilweise unsicher


---

# CSP: Sinnvolle Konfiguration

### Allgemein
Im Moment wird empfohlen das dies nicht der einzige Cross Site Scripting  Schutz ist (defense in depth)
- immer `upgrade-insecure-requests` wenn möglich
- CSP setzen über Header

### Je nach Anwendung
- nur Lokal, ohne Uploads, kein Jsonp: self
- Sources werden kontrolliert: hash strict
- Sources kommen von extern: nonce und strict-dynamic

- Trusted-Type ist noch nicht in jedem Browser -> später Vanillajs Projekten oder im Framework aktivieren

---

## Wogegen das schützt: Data Leaks
  Beispiel:
  - ein Angreifer fügt einen Post hinzu der auf ein Bild auf dem bösen Server zeigt
  - User besucht das Forum und lädt das Bild
  - Angreifer kann Zugriffe loggen
  - `Content-Security-Policy: img-src`  blocked das


---

## Wogegen das schützt: Cross Site Scripting (XSS) (CWE-79)

   Beispiel:

  - Frontend hat XSS Verwundbarkeit (Forumsbeiträge werden direkt als Html gerendert)
  - Angreifer postet Beitrag mit z.B. `<img src="notexisting" onError="...evil js code.."/>`
    - Code z.B. fremde Scripte, Daten stehlen und für Exfiltration externes Bild aufrufen,...
  - User öffnet Forum - Code wird ausgeführt

  - Sicheren CSP Headern können ausführen von nicht autorisiertem JS-Code blocken

---

## Übungen

- Übung 3b
- Übung 4
---