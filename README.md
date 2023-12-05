# Microservice

## Lancement

La branche la plus à jour est la branche Main.

ActiveMQ :

Lancez le serveur ActiveMQ. Assurez-vous que le serveur est opérationnel.
MS Notification (backendNodeJS/NotificationMS.js) :
Accédez au répertoire backendNodeJS.
Exécutez le fichier NotificationMS.js à l'aide de Node.js.

MS Plateau de jeu (backendNodeJS/GameService.js) :
Accédez au répertoire backendNodeJS.
Exécutez le fichier GameService.js à l'aide de Node.js.

MS du chat (BackendNodeJS/Server.js) :
Accédez au répertoire BackendNodeJS.
Exécutez le fichier Server.js à l'aide de Node.js.

Frontend (frontend/react-front) :
Accédez au répertoire frontend/react-front.
Lancez l'application frontend. Cela dépend du framework utilisé avec npm start
Si vous voulez utiliser le jeu lancez deux instances du front (en precisant 2 ports differents avec "--port") et connectez vous avec deux comptes differents.

Les 4 MS avec Spring :
Exécutez chaque service à l'aide de la commande spécifique pour Spring Boot


FAIT :

L'activité 1 est réalisé.
Chat 80% (on a pas implémenter d'historique) /!\ lorsque plusieurs users sont sur la page du chat, il faudra surement refresh la page pour que la liste des users connectées se modifie 
plateau de jeux (duel entre 2 utilisateurs)

PAS FAIT :


historique des messages du chat
proxy
MS springBoot logger
Activité 3

Il y a 2 videos :
l'une de toutes les applications ensemble (buy/sell et jeux).
l'une du fonctionnement du chat 

On a deux videos mais tout fonctionne sur la même application

## Informations 

Équipe Walid Iqbal, Rayane Nini, Simon Gohlke, Manu Suau

lien du Git : https://github.com/ManuSuau/ASI2-ProjetESB/

Walid Iqbal : Front + Notification + Plateau de jeux (coté front)

Manu SUAU : Backend Spring + Notification + Plateau de jeux (coté back)

Simon Gohlke : Backend Spring + Chat + Plateau de jeux (coté back)

Rayane Nini : Front + chat + Plateau de jeux (coté front)
