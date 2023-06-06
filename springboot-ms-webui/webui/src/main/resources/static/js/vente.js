
/*// Effectuer une requête GET à l'API avec la valeur récupérée
var apiUrl = "/cards";
fetch(apiUrl)
.then(response => response.json())
.then(data => {
// Utiliser les données de la réponse
var cardId = data.id;
var cardName = data.name;
var cardImageUrl = data.imageUrl;
var cardDescription = data.description;
var cardAttack = data.attack;
var cardDefense = data.defense;
var cardOwner = data.owner;

// Mettre à jour les éléments HTML avec les valeurs des données
document.getElementById("cardId").textContent = cardId;
document.getElementById("cardName").textContent = cardName;
document.getElementById("cardImage").setAttribute("src", cardImageUrl);
document.getElementById("cardDescription").textContent = cardDescription;
document.getElementById("cardAttack").textContent = cardAttack;
document.getElementById("cardDefense").textContent = cardDefense;
document.getElementById("cardOwner").textContent = cardOwner;
})
.catch(error => {
// Gérer les erreurs
console.error(error);
}); */


document.addEventListener('DOMContentLoaded', function() {

  const username = localStorage.getItem("username"); // Récupération de la valeur de username depuis localStorage
  const money = localStorage.getItem("money"); // Récupération de la valeur de username depuis localStorage
  const owner_id = localStorage.getItem("user_id");
  const userNameId = document.getElementById("userNameId"); // Sélection de l'élément HTML pour afficher le username
  const moneyId = document.getElementById("money");
  if (username) {
    userNameId.textContent = username; // Modification du contenu de l'élément HTML avec la valeur de username
  } else {
    userNameId.textContent = "Username non disponible"; // Message alternatif si le username n'est pas présent
  }
  if (money) {
    moneyId.textContent = money; // Modification du contenu de l'élément HTML avec la valeur de username
  } else {
    moneyId.textContent = "No Money"; // Message alternatif si le username n'est pas présent
  }
  var cardList = [];
  var apiUrl = "localhost:8000/cards/owner?owner_id="+owner_id;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Utiliser les données de la réponse
      data.forEach(card => {
        // Ajouter l'élément de carte à la liste
        cardList.push(card);
      });

      let template = document.querySelector("#row");

      for(const card of cardList){
          let clone = document.importNode(template.content, true);

          newContent= clone.firstElementChild.innerHTML
                      .replace(/{{imgUrl}}/g, card.imageUrl)
                      .replace(/{{id}}/g, card.id)
                      .replace(/{{prix}}/g, card.prix)
                      .replace(/{{name}}/g, card.name)
                      .replace(/{{description}}/g, card.description)
                      .replace(/{{attack}}/g, card.attack)
                      .replace(/{{defense}}/g, card.defense)
                      .replace(/{{owner}}/g, card.owner)
          clone.firstElementChild.innerHTML= newContent;

          let cardContainer= document.querySelector("#tableContent");
          cardContainer.appendChild(clone);
      }
    })
    .catch(error => {
      // Gérer les erreurs
      console.error(error);
    });




});

// Fonction pour effectuer la vente de la carte
function venteCarte(i) {
    const cardId = parseInt(i);
    var apiUrl = "localhost:8000/store/sell";
    const userId = parseInt(localStorage.getItem("user_id"), 10);


    var params = {card_id: cardId}; // Paramètres de la requête

    // Convertir les paramètres en une chaîne de requête
    var queryString = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

    // Ajouter la chaîne de requête à l'URL
    var requestUrl = `${apiUrl}?${queryString}`;


    fetch(requestUrl)
      .then(response =>{
          if (response.ok) {
                var apiUrl = "localhost:8000/users/"+userId;
                fetch(apiUrl)
                  .then(response =>{
                          if (response.ok) {
                                return response.json();
                              } else {
                                location.assign("/menu.html");
                              }
                            })
                  .then(response => {
                    if (response.username != null) {
                      localStorage.setItem("money", response.money);
                      location.assign("/menu.html");
                    } else {
                      location.assign("/menu.html");
                    }
                      })

              }
          })
      .catch(error => {
        // Gérer les erreurs
        console.error(error);
      });
}







