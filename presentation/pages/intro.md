---

# Sicherheitsprobleme von Webapps

z.B:
- man-in-the-middle-attacks
- Data-leaks
- session-stealing
- Click-jacking
- XXE
- XSS
- CORS-leak
- CSRF

---
layout: two-cols-header
---
## Zum Glück gab es schon viele Fortschritte 
 
Zum Beispiel

::left::

-  Encryption of traffic http -> https
-  Ablösung von XML durch json & schließen von Sicherheitslücken in XML
-  Implementierungen zum Sanitizen von unsicheren DOM Daten 
-  besserer Popup-Schutz
-  relativ sichere Standardimplementierungen von relevanten Server/Client Funktionen z.B. Spring Boot, Frontend Frameworks

::right::

Browser haben inzwischen viele Sicherheitsfeatures die bei der Vermeidung von Sicherheitsproblemen helfen

Für die korrekte Nutzung dieser Features muss man sie verstehen

auch in Zeiten von KI muss man wissen wonach man fragen soll `:-)` 

---

## Headergesteuerte Browser-Sicherheitsfeatures

Ich stelle heute die wichtigsten Sicherheitsfeatures und welche Probleme sie lösen vor.

insbesondere 
- Same Origin Policy & CORS
- Cookies und ihre Einstellungen
- Content Security Policy
- Sonstige Header
- Cross Origin Isolation


