---

# Sonstige Header mit Security Bezug 1


- Deprecated Header
  - X-XSS-Protection: 0


- Data-Leak Header
  - Server: webserver
  - X-Powered-By
  - Referrer-Policy: strict-origin-when-cross-origin (welche Informationen werden an den Request gehängt)

- Sonstiges (immer sinnvoll)
  - Content-Type: text/html; charset=UTF-8
  - X-Content-Type-Options: nosniff
---

# Sonstige Header mit Security Bezug 2

- HTTPS
  - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
    - blocks all non-encrypted traffic
    - status is stored in the browser (can be sniffed e.g. can lead to data leaks)

- Sonstiges
  - Cache-Control 
  - Permissions-Policy: geolocation=(), camera=(), microphone=()
  - X-Robots-Tag: noindex, nofollow
  - X-DNS-Prefetch-Control: off (in Safari geht das sowieso nicht)
  - X-Frame-Options: DENY





---

# Spectre (CWE-1342) und Cross Origin Isolation 

Spekulative Ausführung erlaubte das Auslesen des gesamten Speichers in einem Kontext


Schutz: bessere Isolation (cross origin isolation)

JS-APIs die Cross-Origin-Isolation brauchen (sonst abgeschaltet)
- SharedArrayBuffer
- Performance.now()
- Performance.measureUserAgentSpecificMemory() 

Externe High-Performance Frameworks/Web-Apps

---

# Cross Origin Isolation Header 

### COOP
- Damit Tabs keinen Kontext teilen
- Cross-Origin-Opener-Policy: same-origin

### COEP
- Kontrolliert was embedded werden kann
- Cross-Origin-Embedder-Policy: require-corp  (richtigen CORP Header oder CORS korrekt)

## CORP
- Wer darf Ressource nutzen (kommt von Ressource)
- Cross-Origin-Resource-Policy: same-origin

---

# Tools

Es gibt Online-Tools mit denen die Header-Einstellungen getestet werden können. z.B.:

- https://developer.mozilla.org/en-US/observatory Analyse von Online-Seiten (Überblick)
- https://headertest.com/ - Analyse von Online Seiten (detailliert)
- https://csp-evaluator.withgoogle.com/ - nur CSP Einstellungen

---

# Zusammenfassung und Ausblick

- Browser haben inzwischen viele gute Sicherheitsfunktionen
- Über Header kann die Sicherheit von Webanwendungen deutlich gesteigert werden
- Sichere Defaults erfordern das Verstehen der Mechanismen z.B. für Dev-Umgebungen
- Mit guter Konfiguration können viele Angriffsszenarien geblockt werden e.g.
  - Cross Domain Leaks (CSRF (CWE-352), CORS-Data-Leak (CWE-942))
  - Weitergabe von sensiblen Informationen (z.B. Seitenbesuch) (CWE-200)
  - Cross site scripting XSS (CWE-79)
  - (Clickjacking CWE-1021)

- Zusätzliche Sicherheitsfunktionen wie z.B. Cross Origin Isolation oder die Trusted Types API kommen kontinuierlich dazu

Aufmerksamkeit lohnt sich!


---

# Quellen 1

#### CORS
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin

#### Cookies
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie

#### CSP

- https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy

##### Trusted types
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for


---
# Quellen 2
#### Security Header
- https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
- https://www.leviathansecurity.com/blog/the-double-edged-sword-of-hsts-persistence-and-privacy

#### Cross origin isolation
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy
- https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated
- https://furkanbaytekin.dev/blogs/what-are-coop-coep-and-corp-headers-and-why-browsers-needed-them