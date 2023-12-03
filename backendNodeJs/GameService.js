const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});

let connectedUsers = {}; // Stocker les utilisateurs en attente de partie avec leurs cartes choisies
let gameRooms = []; // Stocker les salles de jeu en attente

io.on('connection', (socket) => {
    console.log('Nouvelle connexion websocket établie.');
    
    
    socket.on('startgame', (data) => {
      console.log(data);
      const { userId, cards } = data;
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
  
        gameRooms.push(gameRoom);
        console.log(gameRooms);
        const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
        const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
    
      io.to(user1.socketId).emit('game_start', userDataForPlayer1);
      io.to(user2.socketId).emit('game_start', userDataForPlayer2);
      }
    });


    socket.on('attaque', (data) => {
      const { userId, cardId, opponentCardId } = data;
      console.log("attaque"+gameRooms);
      for (const room of gameRooms) {
        user1 = room.find(user => user.userId === userId);
        if (user1) {
          console.log('User found in room');
          console.log('User details:', user1);
          user2 = room.find(user => user.userId !== userId);
          GR = room
          if (user1.canAttack) {
            if(user1.GamePoint>0){
              cardAttack = user1.cards.find(card => card.cardid === cardId);
              cardDefense = user2.cards.find(card => card.cardid === opponentCardId);
              if(cardAttack && cardDefense && cardAttack.defense>0 && cardDefense.defense>0){
                cardDefense.defense = cardDefense.defense - cardAttack.attaque;
                const indexCarte = user2.cards.findIndex(card => card.cardid === opponentCardId);
                if (indexCarte !== -1) {
                  user2.cards[indexCarte] = cardDefense;
                  user1.GamePoint = user1.GamePoint-1;
                  const NGR = [user1, user2];
                  gameRooms.pop(GR);
                  gameRooms.push(NGR);
                  const userDataForPlayer1 = { opponent: user2, myDetails: user1 };
                  const userDataForPlayer2 = { opponent: user1, myDetails: user2 };
                  io.to(user1.socketId).emit('resultat_attaque', userDataForPlayer1);
                  io.to(user2.socketId).emit('resultat_attaque', userDataForPlayer2);
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
      const {userId} = data;
      for (const room of gameRooms) {
        user1 = room.find(user => user.userId === userId);
        if (user1 && user1.canAttack) {
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
      });
  
  });
  
  server.listen((3001), () => {
    console.log('Serveur WebSocket en cours d\'exécution sur le port 3001');
  });