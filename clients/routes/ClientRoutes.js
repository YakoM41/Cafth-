// Chemin : /api/clients
const express = require("express");
const { register, getMe, logout } = require("../controllers/ClientController");
const router = express.Router();
const { login } = require("../controllers/ClientController");
const { verifyToken } = require("../../Middleware/authMiddleware");

//Verification de session du client
//Route protégée
//GET/api/clients/me
router.get("/me", verifyToken, getMe);

//Deconnexion
//Route protégée
//GET/api/clients/logout
router.post("/logout", logout);

//Inscription d'un client
//POST /api/clients/register
//Body : { Nom, Prenom, Email, Mot_de_passe} - les propriétés à donner à postman pour tester
router.post("/register", register);

//Connexion
//POST /api/clients/login
//Body : { Email, Mot_de_passe }
router.post("/login", login);

module.exports = router;
