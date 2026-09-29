import { db } from '../database/database';
import { NewUser, User } from '../../domain/user';

export const userRepository = {
  create(user: NewUser): void {
    db.runSync(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      user.name,
      user.email,
      user.password
    );
  },

  getAll(): User[] {
    return db.getAllSync<User>('SELECT id, name, email FROM users ORDER BY id DESC');
  },
};
