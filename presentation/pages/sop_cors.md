---

# Same Origin Policy
- Mit welchen Hosts interagieren - fetch (bzw. XMLHttpRequest) 
- Mechanismus im Browser der Operationen bzw. ihre Antworten ggf. blockiert
- Notwendig damit fremde Webseiten keine Calls zu fremden Backends machen können

- Same origin ist: selbes Protokoll (z.B. http, https), selbe Domain, selber Port wie Webseite
    - Wenn alle Eigenschaften erfüllt sind wird der Request vom Browser durchgelassen.
- per default bei allen Browsern an

- fremde APIs nur mit Cross-Origin Resource Sharing Header

---
layout: two-cols-header
---

# CORS GET/HEAD

Seitenübergreifenden API-Zugriffe gehen über Cross-Origin Resource Sharing

::left::
- Browser sendet request mit origin header (und schickt ggf Cookie mit)
- Server schickt Access-Control-Header zurück die dem Browser mitteilen von welcher URL auf Server-Ressourcen zugegriffen werden kann.
- Wenn Request nicht durch kommt -> Antwort blockiert und Type Error (der Fehler wird allerdings in der Console ausgegeben)
- POST requests mit Content-Type application/x-www-form-urlencoded, multipart/form-data oder text/plain funktionieren auch ohne preflight s.u.

::right::
Headers:

- Access-Control-Allow-Origin: https://myweb.app:6768
- Access-Control-Allow-Methods `GET,...`
- Access-Control-Allow-Headers
- Access-Control-Allow-Credentials: true
- Access-Control-Max-Age

Auch mehrere verschiedene Ziele / Methoden möglich



---

# CORS POST/PUT/DELETE


Bei State-verändernden Requests wie POST: vor dem Request - OPTIONS-Request d.h.

    - OPTIONS-Request
    - Server antwortet mit Access-Control-Header  
    - hat Antwort auf OPTIONS-Request passende Access-Control-Header wird POST/PUT/DELETE-Request losgeschickt 
    - sonst wird request blockiert und unspezifischer Fehler zurückgegeben (und in console erklärt)  



---

# Wogegen schützt die SOP: CORS Data leaks

Beispiel
- Nutzer geht auf Forum bei dem man sich einloggt (über einen extra Server) 
- der Login Server gibt ein (unsicheren) Http-only-Cookie zurück 
- das Forum zeigt bestehende Posts an (über API Anfrage)
- Nutzer geht auf böse Seite
- böse Seite schickt API Anfrage an Backend des Forums (mit dem Login-Cookie) und bekommt Antwort (die sie dann z.B. irgendwo speichern könnte)

- richtig gesetzte CORS Header (oder die defaults)

---

# Wozu ist das wichtig? z.B. CSRF(CWE-352)

  - Nutzer geht wieder auf Forum und loggt sich ein
  - API Server hat CORS-Schutz an
  - Nutzer besucht böse Seite
  - Böse Seite schickt "einfachen" POST request an Forum
  - Request verändert Zustand (auch wenn die Antwort dann durch CORS blockiert wird)

  - richtig gesetzte CORS Header verhindern über OPTIONS preflight viele POST requests s.o.

---

# Übungen

#### url
https://github.com/thjmark/browser-header-security

#### Starten mit

cd demo
npm install
npm run start:all

# TODO
- 1. Übung (am besten nach dem Lösen resetten)
- 2. Übung(a) Löse CSRF mit CORS Headern

