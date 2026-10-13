Erzählung

## seit frühzeit des Webs gibt es Sicherheisprobleme
z.B:
- man in the middle
- session stealing
- Click jacking
- XEE
- XSS
- CORS leak
- CSRF
- Data leaks

## Zum Glück gab es schon viele Fortschritte 
z.B. 
-  http-> https
-  XML-> json + (Schließen von Sicherheitslücken)
-  bessere Popup schutz (TBD)
- mechanismen zu säubern von unsicheren DOM Daten 
    - frameworks
- relativ sichere standart Implementierungen z.B. Spring

- Browser haben inzwischen viele Sicherheitsfeatures die bei der Vermeidung von Sicherheitsprobleme helfen

- Für die korrekte Nutzung dieser Features muss man sie verstehen
- (auch in Zeiten von KI muss man wissen wonach man fragt:-) ) 

## Browser  Sicherheitsfeatures (sichere Headers)

### Ich stelle heute die wichtigsten Sicherheitsfeatures und welche Probleme sie lösen vor.
insbesondere 
- Same orgin Policy & CORS
- Cookies und Einstellungen
- Content Security Policy
- Sonstige Header
- Fortgeschrittenes Sandboxing COOP,COEP,CORP


