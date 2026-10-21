
---

# Same Origin Policy
- Mit welchen Hosts interagieren -  fetch (bzw XMLHttpRequest) 
- Mechanismus im Browser der Operationen bzw. ihre Antworten ggf. blockiert
- Notwendig damit fremde Webseiten keine Calls zu fremden Backends machen können

- Same origin ist: selbes Protokoll (z.B. http, https), selbe domain, selber port wie Webseite
    - Wenn alle eigenschaften erfüllt sind wird der Request vom Browser durchgelassen.
- per default bei allen Browsern an

- fremde APIs nur mit Cross-Origin Resource Sharing Header

---
layout: two-cols-header
---

# CORS GET/HEAD

Seitenübergreifenden API-Zugriffe gehen über Cross-Origin Resource Sharing

::left::
- Browser sendet request mit origin header (und schickt ggf Cookie mit)
- Server schickt Access-Control-Header zurück die dem Browser mitteilen von welcher url auf Server resourcen zugegriffen werden kann.
- Wenn request nicht durch kommt -> Antwort blockiert und  Type Error (der Fehler wird allerdings in der Console ausgegeben)
- POST requests mit Content type application/x-www-form-urlencoded,multipart/form-data oder text/plain funktionieren auch ohne preflight s.u.

::right::
Headers:

- Access-Control-Allow-Origin: https://myweb.app:6768
- Access-Control-Allow-Methods `GET,...`
- Access-Control-Allow-Headers
- Access-Control-Allow-Credentials: true
- Access-Control-Max-Age

Auch mehrere verschiedene Ziele/ Methoden möglich



---

# CORS POST/PUT/DELETE


Bei server veränderten Request wie POST wird oft vor dem request ein OPTIONS request losgeschickt d.h.

GRAPH

    - OPTIONS Request
    - Server antwortet mit Access-Control- header  
    - hat Antwort auf OPTIONS request passende Access-Controll header wird post/put/delete request losgeschickt 
    - sonst wird request blockiert und unspezifischer Fehler zurückgegeben (und in console erklärt)  



---

# Wogegen schützt die SOP: CORS Data leaks

Beispiel
- Nutzer geht auf Forum bei der man sich einloggt (über einen extra Server) 
- der Login Server gibt ein (unsicheren) Http-only-Cookie zurück 
- das Forum zeigt bestehende Posts an (über API Anfrage)
- Nutzer geht auf böse Seite
- böse Seite schickt API Anfrage an Backend des Forums(mit dem login Cookie) und bekommt Antwort (die sie dann z.B. irgendwo speichern könnte)

- richtig gesetzte CORS Header (oder die defaults)

---

---

# Wozu ist das wichtig? z.B. CSRF(CWE-352)

  - Nutzer geht wieder auf Forum und loggt sich ein
  - API Server hat Cors schutz an
  - Nutzer besucht böse Seite
  - Böse seite schickt "einfachen" POST request an Forum
  - request verändert zustand (auch wenn die Antwort dann durch CORS blockiert wird)

  - richtig gesetzte CORS header verhindern über OPTIONS preflight viele POST requests s.o.

---

# Übungen

- 1. Übung
- 2. Übung(a)

