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
Chat 70% (on a pas reussi à l'integrer dans avec le front React)
plateau de jeux (duel entre 2 utilisateurs) 80% (problème d'affichage des valeurs des cartes apres avoir subis des attaques)

PAS FAIT :


historique des messages du chat
proxy
MS springBoot logger
Activité 3

Pour le chat et le plateau de jeux, on les a developpé avec des fronts independant du React, et on a rencontré enormement de problèmes lors de l'integration au React.

Il y a 3 videos :
l'une de toutes les applications ensemble (buy/sell et une partie du jeu de combat).
l'une du fonctionnement du nodeJs du jeux avec un front à part.
l'une du fonctionnement du chat avec un front à part.

## Informations 

Équipe Walid Iqbal, Rayane Nini, Simon Gohlke, Manu Suau

lien du Git : https://github.com/ManuSuau/ASI2-ProjetESB/

Walid Iqbal : Front + Notification + Plateau de jeux (coté front)

Manu SUAU : Backend Spring + Notification + Plateau de jeux (coté back)

Simon Gohlke : Backend Spring + Chat + Plateau de jeux (coté back)

Rayane Nini : Front + chat + Plateau de jeux (coté front)
