

---

# Sonstige Header mit Security Bezug 1


- Deprecated header
  - X-XSS-Protection: 0


- Data leak header
  - Server: webserver
  - X-Powered-By
  - Referrer-Policy: strict-origin-when-cross-origin (welche Information werden an den Request gehängt)

- Sonstiges (immer sinnvoll)
  - Content-Type: text/html; charset=UTF-8
  - X-Content-Type-Options: nosniff
---

# Sonstige Header mit Security Bezug 2

- HTTPS
  - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  - blocks all non encrypted traffic
  - status is stored in browser (can be sniffed i.e. can lead to data leaks)

- Sonstiges
  - Cache-Control 
  - Permissions-Policy: geolocation=(), camera=(), microphone=()
  - X-Robots-Tag: noindex, nofollow
  - X-DNS-Prefetch-Control: off (in Safari geht das sowieso nicht)
  - X-Frame-Options: DENY





---

# Spectre (CWE-1342) und Cross Origin Isolation 

Spekulative Ausführung erlaubte auslesen allen speichers in einem Kontext


Schutz bessere Isolation (cross origin isolation)

JS-API die Cross origin isolation brauchen (sonst abgeschaltet)
- SharedArrayBuffer
- Performance.now()
- Performance.measureUserAgentSpecificMemory() 

Externe High-performance frameworks/web apps

---

# Cross Origin Isolation Header 

### COOP
- Damit tabs keinen Kontext teilen(What it is: COOP controls how your page relates to other tabs or windows.)
- Cross-Origin-Opener-Policy: same-origin

### COEP
- Kontrolliert was embedded werden kann
- Cross-Origin-Embedder-Policy: require-corp  (richtigen CORP header oder CORS korrekt)

## CORP
- Wer darf resource nutzen (kommt von resource)
- Cross-Origin-Resource-Policy: same-origin

---

# Zusammenfassung und Ausblick

- Browser haben inzwischen viele gute Sicherheitsfunktionen
- Über Header kann die Sicherheit von Webanwendungen deutlich gesteigert werden
- Sichere defaults erfordern verstehen der Mechanismen z.B. für Dev-Umgebungen
- Mit guter Konfiguration können viele Angriffszenarien geblockt werden e.g.
  - Cross Domain Leaks (CSRF(CWE-352), CORS-Data leak(CWE-942))
  - Weitergabe von sensiblen Information (z.B. Seitenbesuch) (CWE-200)
  - Cross site scripting XSS (CWE-79)
  - (Clickjacking CWE-1021)

- Zusätzliche Sicherheitsfunktionen wie z.B. Cross Origin Isolation oder die trusted type api kommen kontinuierlich dazu

Aufmerksamkeit lohnt sich!


---
# Quellen

#### CORS
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin

#### Cookies
 - https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie

#### CSP

- https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy

##### Trusted types
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for

#### Security Header
- https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
- https://www.leviathansecurity.com/blog/the-double-edged-sword-of-hsts-persistence-and-privacy

#### Cross origin isolation
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy
- https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated
- https://furkanbaytekin.dev/blogs/what-are-coop-coep-and-corp-headers-and-why-browsers-needed-them