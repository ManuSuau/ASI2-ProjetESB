const socket = io('http://localhost:3000');

document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
  const userId = document.getElementById('userId').value;
  const cardId1 = document.getElementById('card1').value;
  const cardId2 = document.getElementById('card2').value;
  const cardId3 = document.getElementById('card3').value;

  // Envoi des données au serveur pour démarrer le jeu
  socket.emit('startgame', { userId, cardId1, cardId2, cardId3 });
}

socket.on('game_start2', (data) => {
    console.log('Game started:', data);
    // Afficher les détails de la partie dans l'interface utilisateur
    alert(`Game started!\nYour opponent: ${JSON.stringify(data.opponent)}\nYour details: ${JSON.stringify(data.myDetails)}`);
  });


socket.on('game_start', (data) => {
    const userDetailsDiv = document.getElementById('userDetails');
    userDetailsDiv.innerHTML = '';

    const user = data.myDetails;
    const opponent = data.opponent;

    userDetailsDiv.innerHTML += '<div style="color: blue;">Vos cartes :</div>';
    userDetailsDiv.innerHTML += renderCards(user);

    userDetailsDiv.innerHTML += '<div style="color: red;">Cartes de l\'adversaire :</div>';
    userDetailsDiv.innerHTML += renderCards(opponent);

    userDetailsDiv.innerHTML += '<button onclick="attack()">Attaquer</button>';
    userDetailsDiv.innerHTML += '<button onclick="endTurn()">Fin de tour</button>';
  });

function renderCards(player) {
let html = '<div class="card">Carte 1: ' + player.cardId1 + '</div>';
html += '<div class="card">Carte 2: ' + player.cardId2 + '</div>';
html += '<div class="card">Carte 3: ' + player.cardId3 + '</div>';
return html;
}

function attack() {
// Logique d'attaque à implémenter
alert('Attaquer !'); // Remplacez par votre propre logique d'attaque
}

function endTurn() {
// Logique de fin de tour à implémenter
alert('Fin de tour !'); // Remplacez par votre propre logique de fin de tour
}