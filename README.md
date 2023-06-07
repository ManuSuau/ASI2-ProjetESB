# Microservice

## Lancement
```
cd docker
docker-compose up --build 
```
Remarque : si besoin, ```docker-compose up --build --pull always```

## Arrêt
```
cd docker 
docker-compose down
```
Remarque : si besoin,  ```docker-compose down --rmi local -v``` 

## Informations 

La branche main montre le découpage en microservices des différents composants. Elle est fonctionnelle.
En ce qui concerne les autres branches, des bugs peuvent apparaître car des difficultés ont été rencontrées, notamment lors de la phase de découpage en microservice et lors de l'ajout d'une librairie commune à tous les microservices.


