

# Same Origin Policy
- steuert mit welchen hosts scripte interagieren können
- Same origin ist: selbes Protokoll (z.B. http, https), selbe domain, selber port

- Notwendig damit fremde webseiten keine Calls zu fremden Backends machen können

- Funktionsweise
- Browser sendet request mit origin header (und schickt ggf Cookie mit)
- Server schickt Access-Control-Header zurück die dem Browser mitteilen von welcher url auf Server resourcen zugegriffen werden kann.
    - Access-Control-Allow-Origin: *
    - Access-Control-Allow-Methods <POST>
    - (Access-Control-Allow-Headers)
    - (Access-Control-Max-Age)
    - Auch mehrere möglich

- Wenn alle eigenschaften erfüllt sind wird der Request vom Browser durchgelassen.

- bei server veränderten Request wie POST wird oft vor dem request ein OPTIONS request losgeschickt (außer bei "einfachen" requests(https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS))

- Wenn request nicht durch kommt gibt es einen Type Error im browser (der Fehler wird allerdings in der Console ausgegeben)

- in modernen Browsern ist SOP per default an
- bei anderen server Zielen muss deshalb CORS konfiguriert werden

Quelle(https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin)


# Wogegen schützt die SOP: CORS Data leaks
Beispiel
- Wir haben eine Seite (Frontend) bei der man sich einloggt (über einen extra server) 
- der login server gibt ein (unsicheren) http only cookie zurück
- das frontend schickt den Cookie an einen API server weiter um post einzusehen oder einen hinzufügen

- Wenn der Nutzer auch auf eine feindliche Seite geht (z.B. durch phishing link). Kann diese Seite etwas auf den Board posten

# 1. Übung

- 1. Übung

