const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*"}});
const stompit = require('stompit');


const connectOptions = {
  host: '127.0.0.1',
  port: 61613,
  connectHeaders: {
    login: 'admin',
    passcode: 'admin',
  },
};

stompit.connect(connectOptions, (error, client) => {
  if (error) {
    console.error('Erreur de connexion:', error);
    return;
  }

  const headers = {
    destination: '/queue/NOTIFBUS',
    ack: 'auto',
  };

  client.subscribe(headers, (error, message) => {
    if (error) {
      console.error('Erreur:', error);
      return;
    }

    message.readString('utf-8', (error, body) => {
      if (error) {
        console.error('Erreur:', error);
        return;
      }
      body = JSON.parse(body);
      console.log(body)
      if (body.finished) {
        io.emit('transaction', body);
      } else {
        console.log("login")
        io.emit('login', body);
      }});
  });
});

io.on('connection', function(socket){
  console.log('Un client s\'est connecté à la WebSocket');
});

server.listen(3333, function(){
  console.log('Le serveur est en écoute sur le port 3333');
});