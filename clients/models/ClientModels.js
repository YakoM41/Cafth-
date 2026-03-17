//MODEL CLIENTS
const db = require("../../db");
const bcrypt = require("bcryptjs");

// Rechercher un client par son ID
const findClientById = async (id) => {
  const [rows] = await db.query("SELECT * FROM client WHERE ID_client = ?", [
    id,
  ]);
  return rows;
};

//RECHERCHER UN CLIENT PAR EMAIL
const findClientByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM client WHERE E_mail = ?", [
    email,
  ]);
  return rows;
};

//CRÉER UN NOUVEAU CLIENT
const createClient = async (clientData) => {
  const {
    Nom,
    Prenom,
    email,
    Mot_de_passe,
    adresse_facturation,
    cp_facturation,
    ville_facturation,
    adresse_livraison,
    cp_livraison,
    ville_livraison,
    telephone,
  } = clientData;

  const [result] = await db.query(
    "INSERT INTO client (Nom, Prénom, E_mail, MDP_client, CP, Ville, Téléphone, CP_livraison, Ville_livraison, Adresse_livraison, Adresse) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
    [
      Nom,
      Prenom,
      email,
      Mot_de_passe,
      cp_facturation || null, // -> CP
      ville_facturation || null, // -> Ville
      telephone || null, // -> Téléphone
      cp_livraison || null, // -> CP_livraison
      ville_livraison || null, // -> Ville_livraison
      adresse_livraison || null, // -> Adresse_livraison
      adresse_facturation || null, // -> Adresse
    ],
  );
  return result;
};

// METTRE À JOUR UN CLIENT
const updateClient = async (clientId, clientData) => {
  const fields = [];
  const values = [];
  // Mappage entre les clés de l'objet clientData et les colonnes de la BDD
  const columnMapping = {
    Nom: "Nom",
    Prenom: "Prénom",
    Email: "E_mail",
    Adresse: "Adresse",
    cp_facturation: "CP",
    ville_facturation: "Ville",
    adresse_livraison: "Adresse_livraison",
    cp_livraison: "CP_livraison",
    ville_livraison: "Ville_livraison",
    telephone: "Téléphone",
  };

  // Construit dynamiquement la requête UPDATE
  for (const key of Object.keys(clientData)) {
    if (columnMapping[key]) {
      fields.push(`${columnMapping[key]} = ?`);
      values.push(clientData[key]);
    }
  }

  if (fields.length === 0) {
    return { affectedRows: 0 }; // Rien à mettre à jour
  }

  values.push(clientId); // Ajouter l'ID du client pour la clause WHERE

  const sql = `UPDATE client SET ${fields.join(", ")} WHERE ID_client = ?`;

  const [result] = await db.query(sql, values);
  return result;
};

//HASHAGE DE MDP

const hashPassword = async (password) => {
  const rounds = parseInt(process.env.BCRYPT_ROUNDS || 10);
  return await bcrypt.hash(password, rounds); // on peut aussi écrire en 1 fois : return await bcrypt.hash(password,parseInt(process.env.BCRYPT_ROUNDS || 10);
};

//Comparer un MDP
const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
module.exports = {
  findClientByEmail,
  createClient,
  hashPassword,
  comparePassword,
  findClientById,
  updateClient,
};
