const express = require('express');
const { connecter } = require('./db/connect');
const routesUtilisateur = require("./routes/users");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", routesUtilisateur);

connecter("mongodb://localhost:27017", (erreur) => {
    if (erreur) {
        console.log("Erreur de connexion à la BDD");
        process.exit(-1);
    } else {
        console.log("Connexion avec la BDD établie");
        app.listen(3000);
        console.log("Attente des requetes 3000");
    }
});