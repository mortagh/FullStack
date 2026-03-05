class User {
  constructor(id, name, email, role) {
    this.id = id;
    this.name = name;
    this.email = email;
    const allowedRoles = ['user', 'admin'];
    const finalRole = role || 'user';
    if (!allowedRoles.includes(finalRole)) {
      throw new Error("Erreur : Le rôle doit obligatoirement être 'user' ou 'admin'.");
    }
    this.role = finalRole;
    this.createdAt = new Date().toISOString();
    this.updatedAt = null; 
  }
}
module.exports = User;