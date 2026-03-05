import { useEffect, useState } from 'react';
import { userService, type User } from '../services/userService';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAll();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;

  return (
    <div>
      <h2>Liste des Utilisateurs</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.email}) - Rôle : {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}