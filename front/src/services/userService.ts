export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string | null;
}

const API_URL_USERS = 'http://localhost:3000/api/users';

export const userService = {
  // Récupérer tous les utilisateurs
  getAll: async (): Promise<User[]> => {
    const response = await fetch(API_URL_USERS);
    if (!response.ok) throw new Error("Erreur lors de la récupération des données");
    return response.json();
  }
};