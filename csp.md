## Content Security Policy
- Mit der CSP kann viel Sicherheitsrelevantes Verhalten im browser gesteuert werden.
  - which resources are loaded
  - control embedding
  - upgrade unsecure request -> https only
  - enforce trusted types
- der CSP wird entweder über ein html meta feld (nur im notfall) oder über  einen http header 
e.g. Content-Security-Policy: default-src 'self';


- Resources:
    - default-src
    - img-src:
    - script-src
    - style-src
    - object-src
  Ziele: (kann kombiniert werden)
    - none
    - self
    - nonce( set in html tag (integrity attribute) + header start with 'nonce-<base64>')
    - hash (start with 'sha256-<base64>)
    - url based allow list
    - unsafe-inline....
    - 'strict-dynamic' (das script und alle scripte die von ihm geladen werden)

  - upgrade-insecure-request

Trusted types
  - mit trusted types kann festgelegt werden das daten vor dem schreiben auf unsichere dom senke sanitized werden müssen
  (ist zu komplex für hier)

(https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy)

- die Konfiguration kann sehr kompliziert sein!
 -  mit Content-Security-Policy-Report-Only kann man sich nur die Fehler anzeigen lassen


## Sinnvolle Configuration

Im Moment wird empfohlen das dies nicht der einzige xss schutz ist (defense in depth)
Immer upgrade-insecure-request wenn möglich
über Header


- nur lokal: self
- sources werden kontrolliert: hash strict
- sources kommen von extern: nonce und strict-dynamic

- trusted type ist noch nicht in jedem Browser -> später  nötig in vanillajs projekten oder für frameworkentwickler

## XSS

   Beispiel:

  - frontend hat xss (führt alles aus nachrichten aus)
  - per xss kann man u.a. auch fremde scripte aufrufen oder ein externes bild aufrufen
  (damit kann man dann daten exfilteireren)
  - mit header kann man xss unterbinden

  ## Demo

  Demo