# Utilise une image de base avec Java 11
FROM adoptopenjdk:11-jdk-hotspot

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le fichier JAR de l'application vers le conteneur
COPY ./authentication/target/*.jar app.jar

# Expose le port sur lequel l'application écoute
EXPOSE 8080

# Commande à exécuter lors du démarrage du conteneur
CMD ["java", "-jar", "app.jar"]
