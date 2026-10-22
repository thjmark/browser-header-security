
---
layout: two-cols-header
---

# Ein paar Worte zu Cookie Einstellungen
- Cookies sind Datenstückchen im Browser gespeichert
- werden von Server gesetzt um State zu transportieren (Set-Cookie Header)
- Secrets müssen nicht in Cookies abgelegt werden: SSO - Auth token in JS Variable, Refresh Token in cookie
### Wichtige Security Einstellungen:
::left::
  - Wer kann auf die Cookiers zugreifen?
    - HttpOnly(js kann nicht auf Cookie zugreifen)
    - SameSite: regelt für welchen host die cookies mitgeschickt werden
      - Strict (nur selbe Seite (Port ist egal))
      - Lax - default in Browser (GET,Top Level Navigation, selbe Seite  )
      - None 
::right::
  - Wie werden die Cookies übertragen?
    - Secure (https only)
  - Wie werden sie gespeichert?
    - Partitioned  (Isolation von Cookies von embeddedten Elementen)
  - (Wie lange leben sie? , maxAge....)

  

---

# Wozu ist das wichtig? z.B. CSRF(CWE-352)

  - Nutzer geht wieder auf Forum und loggt sich ein
  - API Server hat Cors Schutz an
  - Nutzer besucht böse Seite
  - Böse Seite schickt "einfachen" POST request an Forum
  - request verändert zustand (auch wenn die Antwort dann durch CORS blockiert wird)

  - SAME site cookie policy hilft hier
  - besser: Wenn unsichere Post nötig:
    - CSRF Token: nonces über unsichtbares Formularfeld/ test des nonce auf Server 



---

## Wogegen das noch schützt: Data leaks
  Beispiel:
  - in Forum in den posts Bilder eingebunden werden und es gibt xss
  - die Cookies sind über js erreichbar
  - Angreifer kann auf Forum Bild auf bösem Server posten. Über extra Path parameter kann z.B. der Cookie angehängt wird
  - HttpOnly Cookies sind so nicht auslesbar

---

# Übungen
- Übung2
- Übung 3(a)

---
