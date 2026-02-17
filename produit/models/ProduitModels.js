//MODEL PRODUITS
const db = require("../../db");

//fonction qui permet de recuperer tous les produits

const getAllProduits = async () => {
  const [rows] = await db.query("SELECT * FROM produit");
  return rows;
};

//récupérer un article par son ID
const getProduitByID = async (id) => {
  const [rows] = await db.query("SELECT * FROM produit WHERE Référence = ?", [
    id,
  ]); //VOIR REQUETE PREPAREE (ULTRA IMPORTANT POUR LA SECURITE)
  return rows;
};

// Récupérer un article par sa catégorie
const getProduitByCategory = async (categorie) => {
  const [rows] = await db.query("SELECT * FROM produit WHERE Catégorie = ?", [
    categorie,
  ]);
  return rows;
};

//Récupérer un article par son ID
module.exports = {
  getAllProduits,
  getProduitByID,
  getProduitByCategory,
};
