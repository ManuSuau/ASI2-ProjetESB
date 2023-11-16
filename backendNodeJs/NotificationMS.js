const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const stompit = require('stompit');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

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
      console.log('jenvoie : ',body);
      io.emit('myEvent2', body);
    });
  });
});

io.on('connection', function(socket){
  console.log('Un utilisateur s\'est connecté');
});

server.listen(3000, function(){
  console.log('Le serveur est en écoute sur le port 3000');
});