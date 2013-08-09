Sviluppo
==========
Io direi che si fa da subito in mvc in stile Nerdz.js

Cartelle
==========

models => descriviamo le tabelle per l'orm
controller => creiamo una classe per ogni componente logico
views => template html, rss e json
routes => controlla le routes obv
test => i test per vedere se le cose in ogni stadio funzionano

Strumenti
==========
* Express.js
* JugglingDB (unico orm decente)
* direi ejs così possiamo usare tranquillamente template presi da internet
* per i test usare assert, non ci complichiamo la vita più di tanto

Tabelle
==========
* Utenti
** id
** nick
** password
** level
** hash (un hash casuale che viene messo poi nel cookie)
** ultimo login
** tentativi falliti

* Post
** id
** data
** categoria
** testo

Per i commenti usiamo tranquillamente Disqus