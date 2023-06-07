# Microservice

## Lancement
```
cd docker
docker-compose up --build 
```
Remarque : si besoin, ```docker-compose up --build --pull always```

Sur la branche main : 
```localost:8000``` permet d'appeler le reverse proxy. Par exemple, on obtient le message ```Je suis le front``` lors de l'appel à ```localost:8000/front``` (idem pour card, user, auth, store).

Sur la branche impl-AjoutAct2_sansCommonLib : 
Lors de l'appel à ```localost:8000/front```, la page index est retournée. Les autres actions ne fonctionnent pas. 

## Arrêt
```
cd docker 
docker-compose down
```
Remarque : si besoin,  ```docker-compose down --rmi local -v``` 

## Informations 

Équipe Fayçal Thamri, Simon Gohlke, Mohamed Benyoub, Manu Suau, Margot Fierimonte

Ce fichier README contient des informations sur les membres de l'équipe et les contributions individuelles dans notre projet.

Membres de l'équipe :
- Fayçal Thamri
- Simon Gohlke
- Mohamed Benyoub
- Manu Suau
- Margot Fierimonte

Contributions individuelles :

- Fayçal Thamri :
  - Responsable du découpage en microservices de l'application.
  - A travaillé sur l'architecture globale du projet.

- Simon Gohlke :
  - Responsable de l'architecture de l'application.
  - A conçu l'architecture globale de notre projet, en s'assurant qu'elle répond aux exigences techniques et fonctionnelles.
  - A également aidé Manu dans le développement du code, en fournissant des conseils et en résolvant les problèmes techniques.

- Mohamed Benyoub :
  - Responsable des tests de l'application.
  - A travaillé en étroite collaboration avec Margot pour mettre en place des tests unitaires et fonctionnels afin d'assurer la qualité et la fiabilité de notre application.

- Manu Suau :
  - Responsable du développement du code.
  - A travaillé sur la mise en œuvre des fonctionnalités du projet, en se basant sur l'architecture définie par Simon.
  - A également travaillé sur le fonctionnement du code suite à l'évolution de l'architecture.

- Margot Fierimonte :
  - A travaillé en collaboration avec Mohamed pour réaliser les tests de l'application.
  - A contribué à l'élaboration des scénarios de test et à l'exécution des tests unitaires et fonctionnels.
  - A contribué à la rédaction des différents rapports. 

La branche main montre le découpage en microservices des différents composants. Elle est fonctionnelle. Cependant, veuillez noter que les autres branches peuvent présenter des bugs, car des difficultés ont été rencontrées lors de la phase de découpage en microservices et de l'ajout d'une librairie commune à tous les microservices. Ainsi, il est possible de voir sur la branche "impl-ajoutAct2_sansCommonLib" le fonctionnement de notre application sans de librairie commune.


