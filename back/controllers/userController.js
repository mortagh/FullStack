const express = require("express");
const router = express.Router();

const USERS = require("../data/users");
const User = require("../models/userModel");

// get all users
const getAllUsers = (req, res) => {
  res.send(USERS);
};

// get user with id
const getUserById = (req, res) => {
  const user = USERS.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("Utilisateur non trouvé");
  }
  res.send(user);
};

// get user with role
const getUsersByRole = (req, res) => {
  const users = USERS.filter((u) => u.role === req.params.role);
  if (users.length === 0) {
    return res.status(404).send("Aucun utilisateur trouvé avec ce rôle");
  }
  res.send(users);
};

// create user
const createUser = (req, res) => {
  const { name, email, role } = req.body;

  //si email existe déjà
  const existingUser = USERS.find((u) => u.email === email);
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "Un utilisateur avec cet email existe déjà" });
  }

  if (!name || !email || !role) {
    const error = { error: "Veuillez fournir tous les champs obligatoires" };
    if (!name) error.name = "Le nom est requis";
    if (!email) error.email = "L'email est requis";
    if (!role) error.role = "Le rôle est requis";
    return res.status(400).json(error);
  }
  try {
    const newUser = new User(USERS.length + 1, name, email, role);

    USERS.push(newUser);
    res.status(201).send(newUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// update user with id
const updateUser = (req, res) => {
  const user = USERS.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("Utilisateur non trouvé");
  }

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;

  if (req.body.role) {
    const allowedRoles = ["user", "admin"];
    if (!allowedRoles.includes(req.body.role)) {
      return res
        .status(400)
        .json({ error: "Le rôle doit être 'user' ou 'admin'." });
    }
    user.role = req.body.role;
  }

  user.updatedAt = new Date().toISOString();
  res.send(user);
};

// delete user with id
const deleteUser = (req, res) => {
  const user = USERS.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).send("Utilisateur non trouvé");
  }
  USERS.splice(USERS.indexOf(user), 1);
  res.send("Utilisateur " + user.name + " supprimé");
};

module.exports = {
  getAllUsers,
  getUserById,
  getUsersByRole,
  createUser,
  updateUser,
  deleteUser
};