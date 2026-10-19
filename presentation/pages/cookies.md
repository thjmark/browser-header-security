
---
# Ein paar Worte zu Cookie Einstellungen

- Cookies werden von Server gesetzt um State zu transportieren
  - mit Set-Cookie
- Wichtige security Einstellungen sind:
  - HttpOnly (js kann nicht auf cookie zugreifen)
  - Secure (https only)
  - SameSite (Strict (nur selbe seite),Lax(nur bei GET und top level navigation und der selben seite(port ist egal) ), None) 
  - Partitioned  

  (https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie)

---

# Wozu ist das wichtig? CSRF

  - Nutzer geht wieder auf Message board und loggt sich ein
  - api server hat cors schutz an

(hier noch genauer)

---

  # Übung 2

  - Übung2

---