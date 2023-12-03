const socket = io('http://localhost:3000');
document.getElementById('startButton').addEventListener('click', startGame);

function startGame() {
  const userId = document.getElementById('userId').value;
  const cardId1 = document.getElementById('card1').value;
  const cardId2 = document.getElementById('card2').value;
  const cardId3 = document.getElementById('card3').value;

  const cards = [
    { cardId: cardId1, attaque: 100, defense: 50 },
    { cardId: cardId2, attaque: 100, defense: 50 },
    { cardId: cardId3, attaque: 100, defense: 50 }
  ];

  socket.emit('startgame', { userId, cards });
}

socket.on('game_start', (data) => {
    const userDetailsDiv = document.getElementById('userDetails');
    const attackinputdiv = document.getElementById('attackInputs');
    userDetailsDiv.innerHTML = '';

    const user = data.myDetails;
    const opponent = data.opponent;

    userDetailsDiv.innerHTML += '<div style="color: blue;">Vos cartes :</div>';
    userDetailsDiv.innerHTML += renderCards(user);

    userDetailsDiv.innerHTML += '<div style="color: red;">Cartes de l\'adversaire :</div>';
    userDetailsDiv.innerHTML += renderCards(opponent);
    if (user.canAttack) {  
    attackinputdiv.innerHTML += '<input type="text" id="cardId" placeholder="Your Card ID">';
    attackinputdiv.innerHTML += '<input type="text" id="opponentCardId" placeholder="Opponent s Card ID">';
    attackinputdiv.innerHTML += '<button onclick="attack()">Attaquer</button>';
    attackinputdiv.innerHTML += '<button onclick="endTurn()">Fin de tour</button>';
    }
  });

  socket.on('resultat_attaque', (data) => {
    const userDetailsDiv = document.getElementById('userDetails');
    const attackinputdiv = document.getElementById('attackInputs');
    userDetailsDiv.innerHTML = '';

    const user = data.myDetails;
    const opponent = data.opponent;

    userDetailsDiv.innerHTML += '<div style="color: blue;">Vos cartes :</div>';
    userDetailsDiv.innerHTML += renderCards(user);

    userDetailsDiv.innerHTML += '<div style="color: red;">Cartes de l\'adversaire :</div>';
    userDetailsDiv.innerHTML += renderCards(opponent);
    if (user.canAttack) {  
    attackinputdiv.innerHTML += '<input type="text" id="cardId" placeholder="Your Card ID">';
    attackinputdiv.innerHTML += '<input type="text" id="opponentCardId" placeholder="Opponent s Card ID">';
    attackinputdiv.innerHTML += '<button onclick="attack()">Attaquer</button>';
    attackinputdiv.innerHTML += '<button onclick="endTurn()">Fin de tour</button>';
    }
  });

  socket.on('erreur_attaque', (data) => {
    alert(data);
  });

  socket.on('end_game', (data) => {
    alert(data);
  });

function renderCards(player) {
let html = '<div class="card">Carte 1: ' + player.cards[0].cardid + 'attaque' + player.cards[0].attaque + 'defense' + player.cards[0].defense + '</div>';
html += '<div class="card">Carte 2: ' + player.cards[1].cardid + 'attaque' + player.cards[1].attaque + 'defense' + player.cards[1].defense + '</div>';
html += '<div class="card">Carte 3: ' + player.cards[2].cardid + 'attaque' + player.cards[2].attaque + 'defense' + player.cards[2].defense + '</div>';
return html;
}

function attack() {
  const userId = document.getElementById('userId').value;
  const cardId = document.getElementById('cardId').value;
  const opponentCardId = document.getElementById('opponentCardId').value;

  if (!userId || !cardId || !opponentCardId) {
    alert('Veuillez remplir tous les champs pour attaquer.');
    return;
  }

  // Envoi des données au serveur pour l'attaque
  socket.emit('attaque', { userId, cardId, opponentCardId });
}

function endTurn() {
  const userId = document.getElementById('userId').value;
  socket.emit('endTurn', { userId });
  }