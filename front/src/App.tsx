import MovieList from './components/MovieList';
import UserList from './components/UserList/UserList';
import './styles/variable.css';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1 className={styles.logo}>Azeroth Manager</h1>
        <p className={styles.subTitle}>Gestionnaire d'infanterie et de commandement</p>
      </header>

      <main>
        <UserList />
      </main>

      <footer className={styles.footer}>
        © 2026 - Forgefer & Co. - Tous droits réservés par le Conseil des Trois Marteaux
      </footer>
      <MovieList />

    </div>
  );
}

export default App;