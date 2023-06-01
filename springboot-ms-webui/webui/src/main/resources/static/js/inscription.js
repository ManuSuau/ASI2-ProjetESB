
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

  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(requestBody)
  })
    .then(response => {
      if (response.ok) {
        location.assign("/index.html");
      } else {
        location.assign("/inscription.html");
      }
    })
    .catch(error => {
      // Une erreur s'est produite lors de l'envoi de la requête
      // Faites ici le traitement approprié en cas d'erreur
    });
});