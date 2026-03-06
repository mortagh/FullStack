import { useEffect, useState } from 'react';
import { movieService, type Movie } from '../services/MovieService';

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getAll();
        setMovies(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Chargement des Films...</p>;

  return (
    <div style={{color: "white"}}>
      <h2>Liste des Films</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.year}) - Note : {movie.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}