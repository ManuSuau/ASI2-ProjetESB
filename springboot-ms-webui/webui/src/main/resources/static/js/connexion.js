
document.getElementById("inscription").addEventListener("click", function(event) {
        event.preventDefault(); // Empêche la soumission normale du formulaire
        location.assign("/inscription.html");
    });


const form = document.getElementById("myForm");
const nameInput = document.getElementById("name");
const pwdInput = document.getElementById("pwd");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche le rechargement de la page
  const nameValue = nameInput.value;
  const pwdValue = pwdInput.value;
  const requestBody = {
    username: nameValue,
    password: pwdValue
  };

  fetch("localhost:8000/auths", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
  .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          location.assign("/index.html");
        }
      })
    .then(response => {
      if (response.username != null) {
        localStorage.setItem("username", response.username);
        localStorage.setItem("money", response.money);
        localStorage.setItem("user_id", response.id);
        location.assign("/menu.html");
      } else {
        location.assign("/index.html");
      }
    })
    .catch(error => {
      // Une erreur s'est produite lors de l'envoi de la requête
      // Faites ici le traitement approprié en cas d'erreur
    });
});