export interface Movie {
  id: number;
  title: string;
  year: number;
  rating: number;
  createdAt: string;
  updatedAt: string | null;
}

const API_URL_MOVIES = 'http://localhost:3000/api/movies';

export const movieService = {
  // Récupérer tous les Films
  getAll: async (): Promise<Movie[]> => {
    const response = await fetch(API_URL_MOVIES);
    if (!response.ok) throw new Error("Erreur lors de la récupération des données");
    return response.json();
  }
};