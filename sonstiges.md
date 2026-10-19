
X-XSS-Protection: 0

Server: webserver



X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
X-Powered-By
Data leak header


Immer
Content-Type: text/html; charset=UTF-8


Sonstiges
Cache-Control 
Permissions-Policy: geolocation=(), camera=(), microphone=()
X-Robots-Tag: noindex, nofollow
X-DNS-Prefetch-Control: off




Strict-Transport-Security: max-age=63072000; includeSubDomains; preload(oder CSP)


https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html


# Spekter und fortgeschrittene Isolation

Spekulative ausführung erlaubte auslesen allen speichers in einem Kontext
Schutz bessere Isolation (cross origin isolation)


COOP
Damit tabs keinen Kontext teilen(What it is: COOP controls how your page relates to other tabs or windows.)
Cross-Origin-Opener-Policy: same-origin

COEP
Kontrolliert was embedded werden kann
Cross-Origin-Embedder-Policy: require-corp  (richtigen CORP header oder CORS korrekt)

CORP
Wer darf resource nutzen (kommt von resource)

e.g.
Cross-Origin-Resource-Policy: same-origin


