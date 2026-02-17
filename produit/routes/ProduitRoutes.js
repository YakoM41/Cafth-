// ROUTER produits
//Chemin : /api/produits

const express = require("express");
const {
  getAll,
  getByID,
  getByCategory,
} = require("../controllers/ProduitControllers");
const { verifyToken } = require("../../Middleware/authMiddleware");

const router = express.Router();

//GET /api/produits - Récupérer tous les articles

router.get("/", getAll);

//GET /api/produits/:id récupérer un produit par son ID

router.get("/:id", getByID);

//GET /api/produits/:categorie- Récupérer les produits d'une catégorie
router.get("/categorie/:categorie", getByCategory);

module.exports = router;
