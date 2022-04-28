# my-rank


# Domande irrisolte
cosa fare quando un utente abbandona una lega? 
la lega viene rimossa dalle sue leghe? SI
il suo giocatore viene rimosso dalla lega ? SI/NO/NO ma non viene visualizzato o viene visualizzato diverso (boolean value active)
il suo giocatore puo essere selezionato da altri giocatori per scommesse? No / Solo dal super admin 
nel caso un utente si riunisca alla lega devo stare attento a non crear un nuovo player se é disattivo

Probabilmente l'opzione migliore é avere un valore Active all'interno dell'interfaccia Player che permetta di avere i giocatori in lista ma di trattarli in maniera diversa

IN QUESTO MOMENTO: 
la lega viene rimossa dalle sue leghe? SI
il suo giocatore viene rimosso dalla lega ? NO (visualizzato normale senza stato ACTIVE)
il suo giocatore puo essere selezionato da altri giocatori per scommesse? Si (da risolvere)


Join league ->
(posso farlo solo se non sono gia iscritto) -> check implicito - should never happen

Check Player Exists but is Inactive -> Attivalo
Check Player Don't exists -> Create & add to league player list 

User -> add league to joined league
