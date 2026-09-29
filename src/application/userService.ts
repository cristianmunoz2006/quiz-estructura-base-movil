import { NewUser, User } from '../domain/user';
import { userRepository } from '../infrastructure/repositories/userRepository';

export const userService = {
  register(data: NewUser): void {
    const user = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
    };

    if (!user.name || !user.email || !user.password) {
      throw new Error('Todos los campos son obligatorios');
    }
    if (!user.email.includes('@')) {
      throw new Error('El correo no es válido');
    }
    if (user.password.length < 4) {
      throw new Error('La contraseña debe tener mínimo 4 caracteres');
    }

    try {
      userRepository.create(user);
    } catch {
      throw new Error('Ya existe un usuario con ese correo');
    }
  },

  list(): User[] {
    return userRepository.getAll();
  },
};
