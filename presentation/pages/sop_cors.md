
---

# Same Origin Policy
- Mit welchen Hosts interagieren -  fetch (bzw XMLHttpRequest) 
- Mechanismus im Browser der Operationen bzw. ihre Antworten ggf. blockiert
- Notwendig damit fremde Webseiten keine Calls zu fremden Backends machen können

- Same origin ist: selbes Protokoll (z.B. http, https), selbe domain, selber port wie Webseite
    - Wenn alle eigenschaften erfüllt sind wird der Request vom Browser durchgelassen.
- per default bei allen Browsern an

- fremde APIs nur mit CrossOriginRequestSharing Header

---
layout: two-cols-header
---

# CORS GET/HEAD

Seitenübergreifenden API-Zugriffe gehen über CrossOriginRequestSharing

::left::
- Browser sendet request mit origin header (und schickt ggf Cookie mit)
- Server schickt Access-Control-Header zurück die dem Browser mitteilen von welcher url auf Server resourcen zugegriffen werden kann.
- Wenn request nicht durch kommt -> Antwort blockiert und  Type Error (der Fehler wird allerdings in der Console ausgegeben)
- POST requests mit Content type application/x-www-form-urlencoded,multipart/form-data oder text/plain werden wie GET behandelt

::right::
Headers:

- Access-Control-Allow-Origin: https://myweb.app:6768
- Access-Control-Allow-Methods `GET,...`
- Access-Control-Allow-Headers
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




Quelle(https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin)

---

# Wogegen schützt die SOP: CORS Data leaks

SCHAUBILD
Beispiel
- Wir haben eine Seite (Frontend) bei der man sich einloggt (über einen extra server) 
- der login server gibt ein (unsicheren) http only cookie zurück 
- das frontend schickt den Cookie an einen API server weiter um post einzusehen oder einen hinzufügen

- Wenn der Nutzer auch auf eine feindliche Seite geht (z.B. durch phishing link). Kann diese Seite etwas auf den Board posten

---

# 1. Übung

- 1. Übung

