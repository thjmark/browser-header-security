
---
layout: two-cols-header
---
# Sonstige header mit security Verbindung

::left::

- Deprecated header
  - X-XSS-Protection: 0


- Data leak header
  - Server: webserver
  - X-Content-Type-Options: nosniff
  - X-Powered-By
  - Referrer-Policy: strict-origin-when-cross-origin (welche Information werden an den Request gehängt)

- Immer
  - Content-Type: text/html; charset=UTF-8


::right::

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




https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
https://www.leviathansecurity.com/blog/the-double-edged-sword-of-hsts-persistence-and-privacy


---

# Specter und fortgeschrittene Isolation (Cross origin isolation) (CWE-1342)

Spekulative Ausführung erlaubte auslesen allen speichers in einem Kontext
Schutz bessere Isolation (cross origin isolation)

Bestimmte APIS können nur noch mit Activem CORP mechanismus verwendet werden


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
- Sichere defaults erfordern verstehen der Mechanismen für unsicher z.B. Dev Umgebungen
- Mit guter Konfiguration können viele Angriffszenarien geblockt werden e.g.
  - Missbrauch von Sessions (CSRF(CWE-352), CORS-Data leak(CWE-942))
  - Weitergabe von sensiblen Information (z.B. Seitenbesuch) (CWE-200)
  - Cross site scripting XSS (CWE-79)
  - (Clickjacking CWE-1021)

- Zusätzliche Sicherheitsfunktionen wie z.B. Cross Origin Isolation oder die trusted type api kommen kontinuierlich dazu

Aufmerksamkeit lohnt sich!

