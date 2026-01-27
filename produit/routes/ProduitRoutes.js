// ROUTER produits
//Chemin : /api/produits

const express = require("express");
const { getAll, getByID } = require("../controllers/ProduitControllers");
const router = express.Router();

//GET /api/produits - Récupérer tous les articles

router.get("/", getAll);

//GET /api/produits/:id récupérer un produit par son ID

router.get("/:id", getByID);

module.exports = router;
