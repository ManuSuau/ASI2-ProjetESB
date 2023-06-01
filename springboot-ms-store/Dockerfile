# Utilise une image de base avec Maven pour la construction du JAR
FROM maven:3.6.3-openjdk-8 AS builder

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le fichier pom.xml pour installer les dépendances
ARG DIR
COPY ./${DIR}/pom.xml .

# Copie le reste du code source
COPY ./${DIR}/src ./src

# Construit l'application en utilisant Maven
RUN mvn package -DskipTests

# Utilise une image de base avec Java 8 pour exécuter l'application
FROM adoptopenjdk:8-jdk-hotspot

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie le fichier JAR de l'application à partir de l'étape précédente
COPY --from=builder /app/${DIR}/target/*.jar app.jar

# Expose le port sur lequel l'application écoute
ARG PORT
EXPOSE ${PORT}

# Commande à exécuter lors du démarrage du conteneur
CMD ["java", "-jar", "app.jar"]
