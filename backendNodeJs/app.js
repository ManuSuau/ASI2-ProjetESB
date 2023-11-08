const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/get-users', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8083/users'); // Remplacez par l'URL de votre microservice User
        const users = response.data;
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');

    socket.on('message', (message) => {
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

server.listen(3000, () => {
    console.log('Le serveur est en écoute sur le port 3000');
});
