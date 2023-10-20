

document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche la soumission normale du formulaire
        var name = document.getElementById("nameInput").value;
        location.assign("/cardView/"+name);
        var actionUrl = "/view/" + encodeURIComponent(name);
    });