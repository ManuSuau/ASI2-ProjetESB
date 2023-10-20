# Microservice

## Lancement
```
cd docker
docker-compose up --build 
```
Remarque : si besoin, ```docker-compose up --build --pull always```


La branche la plus à jour est impl-AjoutAct2_sansCommonLib.


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

Équipe Walid Iqbal, Rayane Nini, Simon Gohlke, Manu Suau


La branche main montre le découpage en microservices des différents composants. Elle est fonctionnelle. Cependant, veuillez noter que les autres branches peuvent présenter des bugs, car des difficultés ont été rencontrées lors de la phase de découpage en microservices et de l'ajout d'une librairie commune à tous les microservices. Ainsi, il est possible de voir sur la branche "impl-ajoutAct2_sansCommonLib" le fonctionnement de notre application sans de librairie commune.


