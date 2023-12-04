const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const request = require('request');

let users = [];

const connectedUsers = {};
const messageHistory = {};

app.use((req, res, next) => {
  console.log(`${new Date().toLocaleTimeString()} - ${req.method} request for ${req.url}`);
  next();
});

function isValidUser(username, password) {
  return users.some(user => user.username === username && user.password === password);
}

function getUsersFromApi(callback) {
  const apiUrl = 'http://localhost:8083/users';

  request(apiUrl, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      callback(JSON.parse(body));
    } else {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      callback([]);
    }
  });
}

async function updateUsers() {
  getUsersFromApi(apiUsers => {
    users = apiUsers;
  });
}

io.on('connection', (socket) => {
  console.log('Un utilisateur s\'est connecté');

  socket.on('login', async (credentials) => {
    const { username, password } = credentials;
    await updateUsers();

    if (isValidUser(username, password)) {
      userco = users.find(user => user.username === username);
      connectedUsers[userco.id] = { id: userco.id, username: userco.username, socket: socket.id };
      io.to(socket.id).emit('login-success', { id: connectedUsers[userco.id].id, username });
      io.emit('update-user-list', Object.values(connectedUsers));

      socket.join(`user-${connectedUsers[userco.id].id}`);
    } else {
      io.to(socket.id).emit('login-fail');
    }
  });

  socket.on('message', (message) => {
    if(message.receiverId==-1){
        const senderId = message.id;
        const timestamp = new Date().toLocaleTimeString();
        const formattedMessage = `${timestamp} - ${connectedUsers[message.id].username} à tous : ${message.text}`;
        const username = connectedUsers[message.id].username;

        Object.keys(connectedUsers).forEach(userId => {
          if (connectedUsers[userId].id !== message.id) {
            const historyKey = `${senderId}-${connectedUsers[userId].id}`;
            if (!messageHistory[historyKey]) {
                messageHistory[historyKey] = [];
            }
            io.to(`user-${connectedUsers[userId].id}`).emit('message', { senderId, username, historyKey, message: formattedMessage });
          }
        });
    }
    else{
        const senderId = connectedUsers[message.id].id;
        const receiverId = message.receiverId;
        const historyKey = `${senderId}-${receiverId}`;
        const timestamp = new Date().toLocaleTimeString();
        const formattedMessage = `${timestamp} - ${connectedUsers[message.id].username}: ${message.text}`;

        if (!messageHistory[historyKey]) {
            messageHistory[historyKey] = [];
        }
        const username = connectedUsers[message.id].username;

        messageHistory[historyKey].push(formattedMessage);
        io.to(`user-${receiverId}`).emit('message', { senderId, username, historyKey, message: formattedMessage });
    }
  });



  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
    delete connectedUsers[socket.id];
    io.emit('update-user-list', Object.values(connectedUsers));
  });
});

server.listen(4000, () => {
  console.log('Le serveur est en écoute sur le port 4000');
});
