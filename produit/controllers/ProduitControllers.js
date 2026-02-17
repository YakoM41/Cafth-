// CONTROLLER PRODUITS
const {
  getAllProduits,
  getProduitByID,
  getProduitByCategory,
} = require("../models/ProduitModels");

//LE MODÈLE ENVOIE DES DONNEES ICI ET LE CONTROLLER LES ENVOIENT A L'UTILISATEUR

//récupérer tous les produits

const getAll = async (req, res) => {
  try {
    const produits = await getAllProduits();
    res.json({
      message: "Produits récupérer avec succès",
      count: produits.length,
      produits,
    });
  } catch (error) {
    console.error("Erreur de récupération des produits", error.message);
    res.status(500).json({
      message: "Erreur de récupération des produits",
    });
  }
};

//Récupérer un article par son ID
const getByID = async (req, res) => {
  try {
    const { id } = req.params; //ou on peut aussi faire const id = req.params.id; mais cela ne prendra qu'un parametre
    const produitId = parseInt(id);
    const produits = await getProduitByID(produitId);
    if (produits.length === 0) {
      return res.status(404).json({
        message: "Produit non trouvé",
      });
    }
    res.json({
      message: "Produit récupéré avec succès",
      produit: produits[0],
    });
  } catch (error) {
    console.error("Erreur de récupération du produit", error.message);
    res.status(500).json({
      message: "Erreur de récupération du produit",
    });
  }
};

//Récupérer les produits par catégorie
const getByCategory = async (req, res) => {
  try {
    const { categorie } = req.params;
    const produits = await getProduitByCategory(categorie);

    res.json({
      message: `Produits de la catégorie ${categorie}`,
      count: produits.length,
      produits,
    });
  } catch (error) {
    console.error("Erreur de récupération par catégorie", error.message);
    res.status(500).json({
      message: "Erreur de récupération des articles",
    });
  }
};
module.exports = { getAll, getByID, getByCategory };
