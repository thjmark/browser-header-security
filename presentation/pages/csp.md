---

# Content Security Policy

Die Content Security Policy zentralisiert viele Sicherheitseinstellungen für Webseiten

- CSP steuert:
  - welche Ressourcen geladen, embedded oder ausgeführt werden können
  - Typ der Seitenzugriffe e.g. https only
  - enforce trusted types (alle unsicheren Senken müssen sanitized werden)
- CSP setzen über
  - HTML-Meta-Feld (nur im Notfall) 
  - HTTP-Header des HTML-Files e.g. Content-Security-Policy: default-src 'self';



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
    - nonce (set in HTML-Tag (nonce attribute) + header start with `'nonce-<base64>'`)
    - hash (start with `'sha256-<base64>'`)
    - URL based allow list
    - unsafe-inline....
    - 'strict-dynamic' (das script und alle scripte die von ihm geladen werden)


Konfiguration kann sehr kompliziert sein!

Zum Debuggen: `Content-Security-Policy-Report-Only` Fehler loggen aber nicht blocken

---
# CSP Trusted types

Trusted types
  - mit trusted types kann festgelegt werden dass Daten vor dem Schreiben auf unsichere DOM-Senke sanitized werden müssen
  - JS-Code registriert policy -> Funktion die aus Sicht des Entwicklers sanitiertes HTML ausgibt
  - in CSP werden alle gültigen Policies mitgeschickt.
  - wirft TypeError wenn unsanitized strings an unsichere DOM-Senken geschickt werden.
  - Trusted types wird von Frameworks wie Angular (ab 11), React (ab 19.3), Vue (ab 3.4) unterstützt
    - policies sind teilweise unsicher


---

# CSP: Sinnvolle Konfiguration

### Allgemein
Im Moment wird empfohlen dass dies nicht der einzige Cross Site Scripting Schutz ist (defense in depth)
- immer `upgrade-insecure-requests` wenn möglich
- CSP setzen über Header

### Je nach Anwendung
- nur lokal, ohne Uploads, kein JSONP: self
- Sources werden kontrolliert: hash strict
- Sources kommen von extern: nonce und strict-dynamic

- Trusted-Type ist noch nicht in jedem Browser -> später in Vanillajs-Projekten oder im Framework aktivieren

---

# Wogegen das schützt: Data Leaks
  Beispiel:
  - ein Angreifer fügt einen Post hinzu der auf ein Bild auf dem bösen Server zeigt
  - User besucht das Forum und lädt das Bild
  - Angreifer kann Zugriffe loggen
  - `Content-Security-Policy: img-src` blockiert das


---

# Wogegen das schützt: Cross Site Scripting (XSS) (CWE-79)

   Beispiel:

  - Frontend hat XSS Verwundbarkeit (Forumsbeiträge werden direkt als HTML gerendert)
  - Angreifer postet Beitrag mit z.B. `<img src="notexisting" onError="...evil js code.."/>`
    - Code z.B. fremde Scripte, Daten stehlen und für Exfiltration externes Bild aufrufen,...
  - User öffnet Forum - Code wird ausgeführt

  - Sichere CSP Header können die Ausführung von nicht autorisiertem JS-Code blocken

---

# Übungen

#### url
https://github.com/thjmark/browser-header-security

#### Starten mit

cd demo
npm install
npm run start:all

# TODO

- Übung 3b
- Übung 4
---