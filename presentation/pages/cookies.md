
---
# Ein paar Worte zu Cookie Einstellungen

- Cookies sind Datenstückchen im Browser gespeichert
- werden von Server gesetzt um State zu transportieren
  - mit Set-Cookie

- Wichtige Security Einstellungen sind:
  - Wer kann auf die Cookiers zugreifen?
    - HttpOnly(js kann nicht auf cookie zugreifen)
    - SameSite: regelt für welchen host die cookies mitgeschickt werden
      - Strict (nur selbe seite)
      - Lax(nur bei GET und top level navigation und der selben seite(port ist egal) )
      - None 
  - Wie werden die Cookies übertragen?
    - Secure (https only)
  - Wie werden sie gespeichert?
    - Partitioned  (isolation von cookies von embeddedten seiten)
  - (Wie lange leben sie? , maxAge....)

  (https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)

  
  #### Bei SSO wird der Auth token i.d.R. in JS variable gespeichert und kann nicht so geleakt werden. Es gibt aber einen Refresh cookie

---

# Wozu ist das wichtig? CSRF

  - Nutzer geht wieder auf Message board und loggt sich ein
  - api server hat cors schutz an
  - böse seite schickt "einfachen" POST request and dashboard
  - request verändert zustand (auch wenn die Antwort dann durch CORS blockirt wird)

  - neben SAME site cookie policy können auch sog CSRF token helfen
  - CSRF Token: nonces, als unsichtbares Formularfeld mitgeschickt und auf dem server getestet 



---

  # Übung 2

  Übung2

---

---

## Wogegen das Schützt Data leaks
  Beispiel:
  - in frontend können in den posts bilder eingebunden werden und es gibt xss
  - die Cookies sind über js erreichbar
  - Angreifer kann auf Forum Bild auf bösem Server posten an das als zusatzinfo der Cookie angehängt wird
  - HttpOnly Cookies sind so nicht auslesbar

---
# Übung 3
Übung 3(a)
---