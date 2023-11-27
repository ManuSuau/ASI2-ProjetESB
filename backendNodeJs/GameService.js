const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});

let connectedUsers = {}; // Stocker les utilisateurs connectés avec leurs cartes choisies
let gameRooms = []; // Stocker les salles de jeu en attente

io.on('connection', (socket) => {
    console.log('Nouvelle connexion websocket établie.');
  
    socket.on('startgame', (data) => {
        const { userId, cardId1, cardId2, cardId3 } = data;
    
        // Stocker les cartes choisies par l'utilisateur
        connectedUsers[userId] = {
          socketId: socket.id,
          cardId1: cardId1,
          cardId2: cardId2,
          cardId3: cardId3,
          GamePoint: 2,
          canAttack : false,
        };
    
        const connectedUserIds = Object.keys(connectedUsers);
    
        // Vérifier s'il y a au moins deux utilisateurs connectés
        if (connectedUserIds.length >= 2) {
          // Prendre deux utilisateurs au hasard pour commencer le jeu
          const randomUserIndex1 = Math.floor(Math.random() * connectedUserIds.length);
          let randomUserIndex2 = Math.floor(Math.random() * connectedUserIds.length);
    
          while (randomUserIndex2 === randomUserIndex1) {
            randomUserIndex2 = Math.floor(Math.random() * connectedUserIds.length);
          }
    
          const user1 = connectedUsers[connectedUserIds[randomUserIndex1]];
          const user2 = connectedUsers[connectedUserIds[randomUserIndex2]];
    
          // Créer une nouvelle salle de jeu avec ces deux utilisateurs
          const gameRoom = [user1, user2];
    
          // Retirer ces utilisateurs de la liste des utilisateurs connectés
          delete connectedUsers[user1.userId];
          delete connectedUsers[user2.userId];
    
          // Ajouter la salle de jeu à la liste des salles en attente
          gameRooms.push(gameRoom);
    
          // Envoyer un message aux deux utilisateurs pour commencer le jeu
          const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
          const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
      
        io.to(user1.socketId).emit('game_start', userDataForPlayer1);
        io.to(user2.socketId).emit('game_start', userDataForPlayer2);
        }
      });

    socket.on('attaque', (data) => {
      // Logique de gestion de l'attaque et envoi de réponse
      const result = gérerAttaque(data); // Fonction à implémenter
      io.emit('resultat_attaque', result); // Envoyer le résultat à tous les clients
    });

    socket.on('endTurn', (data) => {
        // Logique de gestion de l'attaque et envoi de réponse
        const result = gérerAttaque(data); // Fonction à implémenter
        io.emit('resultat_attaque', result); // Envoyer le résultat à tous les clients
      });
  
    // Autres événements à gérer...
  });
  
  server.listen(3000, () => {
    console.log('Serveur WebSocket en cours d\'exécution sur le port 3000');
  });