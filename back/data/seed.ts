import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/userModel";

dotenv.config();

// Casting de WoW
const wowCharacters = [
  {
    name: "Magni Barbe-de-Bronze",
    email: "magni@khazmodan.wow",
    role: "admin",
  },
  {
    name: "Muradin Barbe-de-Bronze",
    email: "muradin@khazmodan.wow",
    role: "user",
  },
  { name: "Brann Barbe-de-Bronze", email: "brann@explorers.wow", role: "user" },
  { name: "Moira Thaurissan", email: "moira@sombrefer.wow", role: "user" },
  { name: "Thrall", email: "thrall@horde.wow", role: "admin" },
  { name: "Jaina Portvaillant", email: "jaina@alliance.wow", role: "admin" },
  { name: "Sylvanas Coursevent", email: "sylvanas@horde.wow", role: "user" },
  { name: "Arthas Menethil", email: "arthas@scourge.wow", role: "user" },
  { name: "Illidan Hurlorage", email: "illidan@illidari.wow", role: "user" },
  { name: "Tyrande Murmurevent", email: "tyrande@alliance.wow", role: "user" },
  {
    name: "Malfurion Hurlorage",
    email: "malfurion@alliance.wow",
    role: "user",
  },
  { name: "Varian Wrynn", email: "varian@alliance.wow", role: "user" },
  { name: "Anduin Wrynn", email: "anduin@alliance.wow", role: "user" },
  { name: "Baine Sabot-de-Sang", email: "baine@horde.wow", role: "user" },
];

const seedDatabase = async () => {
  try {
    // Connexion à la base de données
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connecté à MongoDB");

    // Nettoyage de la collection
    await User.deleteMany();
    console.log("Base de données vidée.");

    // Insertion des personnages
    await User.insertMany(wowCharacters);
    console.log("Perso ajoutés à la base de données.");

    process.exit();
  } catch (error) {
    console.error("Erreur lors du seed, noob :", error);
    process.exit(1);
  }
};

seedDatabase();
