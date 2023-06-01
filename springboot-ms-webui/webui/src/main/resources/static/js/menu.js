document.addEventListener("DOMContentLoaded", function() {
      const username = localStorage.getItem("username"); // Récupération de la valeur de username depuis localStorage
      const money = localStorage.getItem("money"); // Récupération de la valeur de username depuis localStorage
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
    });


document.getElementById("achat").addEventListener("click", function(event) {
        location.assign("/achat.html");
    });

document.getElementById("vente").addEventListener("click", function(event) {
        location.assign("/vente.html");
    });

document.getElementById("deconnexion").addEventListener("click", function(event) {
        localStorage.removeItem("username");
        localStorage.removeItem("money");
        location.assign("/index.html");


    });