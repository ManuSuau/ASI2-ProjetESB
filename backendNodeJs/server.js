const app = require('express');
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});
const request = require('request');


let users = [];

const connectedUsers = {};
const messageHistory = {};

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
            connectedUsers[socket.id] = { id: users.find(user => user.username === username).id, username };
            io.to(socket.id).emit('login-success', { id: connectedUsers[socket.id].id, username });
            io.emit('update-user-list', Object.values(connectedUsers));

            socket.join(`user-${connectedUsers[socket.id].id}`);
        } else {
            io.to(socket.id).emit('login-fail');
        }
    });

    socket.on('message', (message) => {
        const senderId = connectedUsers[socket.id].id;
        const receiverId = message.receiverId;
        const historyKey = `${senderId}-${receiverId}`;
        const timestamp = new Date().toLocaleTimeString();
        const formattedMessage = `${timestamp} - ${connectedUsers[socket.id].username}: ${message.text}`;

        if (!messageHistory[historyKey]) {
            messageHistory[historyKey] = [];
        }

        messageHistory[historyKey].push(formattedMessage);
        io.to(`user-${receiverId}`).emit('message', { historyKey, message: formattedMessage });
    });

    // Gestion du message "all"
    socket.on('message-all', (message) => {
        const senderId = connectedUsers[socket.id].id;
        const timestamp = new Date().toLocaleTimeString();
        const formattedMessage = `${timestamp} - ${connectedUsers[socket.id].username} à tous : ${message.text}`;
    
        // Diffuser le message à tous les utilisateurs connectés sauf à l'émetteur
        Object.keys(connectedUsers).forEach(userId => {
            if (userId !== socket.id) {
                io.to(userId).emit('message', { historyKey: 'all', message: formattedMessage });
            }
        });
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
