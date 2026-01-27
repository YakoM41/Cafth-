const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config(); // permet de charger les var d'env depuis .env

//connx a la BDD
const db = require("./db");

//importation des routes
const produitRoutes = require("./produit/routes/ProduitRoutes");

// Créa de l'application Express
const app = express();

//Middlewares
//Parser les JSON
app.use(express.json());

//Logger de requête HTTP dans la console (a commenter au passage en ligne)
app.use(morgan("dev"));

//Cors permet les requêtes cross-origines (entre front et bdd)
// Cross Origin Ressource Sharing (CORS) - Obligatoire sinon le navigateur bloque les requetes
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

//ROUTES

//Route de test pour verif' que l'API fonctionne
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "API fonctionnelle",
  });
});

//Routes de l'API
app.use("/api/produits", produitRoutes);

//Gestion des erreurs

//Route 404
app.use((req, res) => {
  res.status(404).json({
    message: "Route non trouvée",
  });
});

//Démarrage du serveur
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, host, () => {
  console.log(`Serveur démarré sur http://${host}:${port}`);
});
