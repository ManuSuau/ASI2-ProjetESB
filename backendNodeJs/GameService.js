const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});

let connectedUsers = {}; // Stocke les utilisateurs en attente de partie
let usersInRoom = {}; // stocke les joueurs en partie
let gameRooms = []; // Stocker les salles de jeu 

io.on('connection', (socket) => {
    console.log('Nouvelle connexion websocket établie.');
    
    
    socket.on('startgame', (data) => {
      const { userId, cards } = data;
      if(!(Object.values(usersInRoom).some(user => user.userId === userId))){
        const  card = cards.map(card => ({
          cardid: card.cardId,
          attaque: card.attaque,
          defense: card.defense
        }));
  
        connectedUsers[userId] = {
          socketId: socket.id,
          userId : userId,
          GamePoint: 2,
          canAttack : false,
          cards: card,
        };
        const connectedUserIds = Object.keys(connectedUsers);
      
        if (connectedUserIds.length >= 2) {
          const randomUserIndex1 = Math.floor(Math.random() * connectedUserIds.length);
          let randomUserIndex2 = Math.floor(Math.random() * connectedUserIds.length);
          while (randomUserIndex2 === randomUserIndex1) {
            randomUserIndex2 = Math.floor(Math.random() * connectedUserIds.length);
          }
          const user1 = connectedUsers[connectedUserIds[randomUserIndex1]];
          const user2 = connectedUsers[connectedUserIds[randomUserIndex2]];
          user1.canAttack = true;
          
          const gameRoom = [user1, user2];
          
          delete connectedUsers[user1.userId];
          delete connectedUsers[user2.userId];
          usersInRoom[user1.userId] = {
            socketId: user1.socketId,
            userId : user1.userId,  
          };
          usersInRoom[user2.userId] = {
            socketId: user2.socketId,
            userId : user2.userId,  
          };
    
          gameRooms.push(gameRoom);
          console.log(gameRooms);
          const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
          const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
      
        io.to(user1.socketId).emit('game_start', userDataForPlayer1);
        io.to(user2.socketId).emit('game_start', userDataForPlayer2);
        }
      }
    });


    socket.on('attaque', (data) => {
      console.log(data)
      const { userId, cardId, opponentCardId } = data;
      for (const room of gameRooms) {
        console.log(room);
        user1 = room.find(user => user.userId === userId);
        if (user1) {
         user2 = room.find(user => user.userId !== userId);
          GR = room
          if (user1.canAttack) {
            if(user1.GamePoint>0){
              cardAttack = user1.cards.find(card => card.cardid === cardId);
              cardDefense = user2.cards.find(card => card.cardid === opponentCardId);
              if(cardAttack && cardDefense && cardAttack.defense>0 && cardDefense.defense>0){
                cardDefense.defense = cardDefense.defense - cardAttack.attaque;
                if(cardDefense.defense<0){
                  cardDefense.defense =0;
                }
                const indexCarte = user2.cards.findIndex(card => card.cardid === opponentCardId);
                if (indexCarte !== -1) {
                  user2.cards[indexCarte] = cardDefense;
                  user1.GamePoint = user1.GamePoint-1;
                  const NGR = [user1, user2];
                  gameRooms.pop(GR);
                  if(CalculEndGame(user2)){
                    const userDataForPlayer1 = { looser: user2, winner: user1 };
                    const userDataForPlayer2 = { winner: user1, looser: user2 };
                    io.to(user1.socketId).emit('end_game', userDataForPlayer1);
                    io.to(user2.socketId).emit('end_game', userDataForPlayer2);
                    delete usersInRoom[user1.userId];
                    delete usersInRoom[user2.userId];
                  }else{
                    gameRooms.push(NGR);
                    const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
                    const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
                    io.to(user1.socketId).emit('resultat_attaque', userDataForPlayer1);
                    io.to(user2.socketId).emit('resultat_attaque', userDataForPlayer2);
                  }
                }else{
                  io.to(user1.socketId).emit('erreur_attaque','attack failed, card unknown' );
                }
              }else{
                io.to(user1.socketId).emit('erreur_attaque','wrong card' );
              }
            }else{
              io.to(user1.socketId).emit('erreur_attaque', 'No GamePoint. you can just end your turn' );
            }
          }else{
            io.to(user1.socketId).emit('erreur_attaque', 'You are not allowed to attack.' );
          }
          break; 
        }
      }
    });



    socket.on('endTurn', (data) => {
      console.log(data);
      const {userId} = data;
      for (const room of gameRooms) {
        user1 = room.find(user => user.userId === userId);
        if (user1) {
          if(user1.canAttack){
            user2 = room.find(user => user.userId !== userId);
            user1.canAttack=false;
            user2.canAttack=true;
            user2.GamePoint=user2.GamePoint+1;
            GR = room
            const NGR = [user1, user2];
            gameRooms.pop(GR);
            gameRooms.push(NGR);
            const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
            const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
            io.to(user1.socketId).emit('resultat_attaque', userDataForPlayer1);
            io.to(user2.socketId).emit('resultat_attaque', userDataForPlayer2);
          }else{
            io.to(user1.socketId).emit('erreur_attaque', 'not your turn' );
          }
        }
      }
      });
  
  });
  
  server.listen(3000, () => {
    console.log('Serveur WebSocket en cours d\'exécution sur le port 3000');
  });

  function CalculEndGame(user){
    return user.cards.every(card => card.defense <= 0);
  }