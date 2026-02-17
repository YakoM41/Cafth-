//INSCRIPTION
const {
  findClientByEmail,
  hashPassword,
  createClient,
  comparePassword,
  findClientById,
} = require("../models/ClientModels");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { Nom, Prenom, email, Mot_de_passe } = req.body;

    //Verifier si l'Email existe déjà
    const existingClient = await findClientByEmail(email);
    if (existingClient.length > 0) {
      return res.status(400).json({
        message: "Erreur : Cet Email est déjà utilisé",
      });
    }

    //Hashage du MDP
    const hash = await hashPassword(Mot_de_passe);

    //Créer le client
    const result = await createClient({
      Nom,
      Prenom,
      email,
      Mot_de_passe: hash,
    });

    res.status(201).json({
      message: "Votre inscription a bien été validé ",
      client_id: result.insertId,
      client: { Nom, Prenom, email },
    });
  } catch (error) {
    console.error("Erreur inscription", error.message);
    res.status(500).json({
      message: "Erreur lors de l'inscription",
    });
  }
};

//Connexion

const login = async (req, res) => {
  try {
    const { email, Mot_de_passe } = req.body;

    //Rechercher le client

    const clients = await findClientByEmail(email);
    if (clients.length === 0) {
      return res.status(401).json({
        message: "Identifiants incorrects",
      });
    }

    const client = clients[0];

    //Vérifier le MDP

    const isMatch = await comparePassword(Mot_de_passe, client.MDP_client);

    if (!isMatch) {
      return res.status(401).json({
        message: "Identifiants incorrects",
      });
    }

    //GÉNÉRER LE TOKEN JWT
    // expire en secondes
    const expire = parseInt(process.env.JWT_EXPIRES_IN, 10 || 3600);
    const token = jwt.sign(
      { id: client.ID_client, email: client.E_mail },
      process.env.JWT_SECRET,
      { expiresIn: expire },
    );

    //On place le token dans un cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // mettre sur vrai en Https (c'est a dire en ligne)
      sameSite: "lax",
      maxAge: expire * 1000,
    });
    res.json({
      message: "Connexion réussie",
      token,
      client: {
        id: client.ID_client,
        nom: client.Nom,
        prenom: client.Prénom,
        email: client.E_mail,
      },
    });
  } catch (error) {
    console.error("Erreur de connexion utilisateur", error.message);
    res.status(500).json({
      message: "Erreur lors de la connexion",
    });
  }
};

//fonction qui permet le logout
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false, // mettre sur vrai en Https (c'est a dire en ligne)
    sameSite: "lax",
  });
  res.json({ message: "Déconnexion réussie" });
};

//Automatiquement le navigateur envoie le cookie
//le middleware verifie le JWT
//SI le token EST valide, On retourne les infos du client
const getMe = async (req, res) => {
  try {
    // req.client.id vient du JWT decode par le middleware verifyToken
    const clients = await findClientById(req.client.id);

    if (clients.length === 0) {
      return res.status(404).json({ message: "Client introuvable" });
    }

    const client = clients[0];

    res.json({
      client: {
        id: client.ID_client,
        nom: client.Nom,
        prenom: client.Prénom,
        email: client.E_mail,
      },
    });
  } catch (error) {
    console.error("Erreur /me:", error.message);
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification de session" });
  }
};
module.exports = { register, login, logout, getMe };
