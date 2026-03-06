import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // On va chercher l'URL dans notre fichier .env
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(` Connecté, tié un bon toi : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion MongoDB, jpense t'a merdé : ${(error as Error).message}`);
    process.exit(1);
  }
};