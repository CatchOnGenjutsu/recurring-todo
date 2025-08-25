import { User } from '../../screens/AuthScreens/RegistrationScreen/RegistrationScreen';
import { getDb } from '../db';

export const UsersRepository = {
  create: async (name: string, email: string, password: string) => {
    const db = getDb();
    try {
      await db.runAsync(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
      );
    } catch (error: any) {
      const raw = error.message;
      if (raw.includes('UNIQUE constraint failed:')) {
        const [, field] = raw.split('UNIQUE constraint failed:');
        throw new Error(
          `Пользователь с таким ${field.trim().split('.')[1]} уже существует`,
        );
      }
      throw error;
    }
  },

  getAll: async () => {
    const db = getDb();
    return ((await db.getAllAsync('SELECT * FROM users')) as User[]) || [];
  },

  getById: async (id: number) => {
    const db = getDb();
    return (await db.getFirstAsync('SELECT * FROM users WHERE id = ?', [
      id,
    ])) as User;
  },

  update: async (id: number, name: string, email: string) => {
    const db = getDb();
    await db.runAsync('UPDATE users SET name = ?, email = ? WHERE id = ?', [
      name,
      email,
      id,
    ]);
  },

  delete: async (id: number) => {
    const db = getDb();
    await db.runAsync('DELETE FROM users WHERE id = ?', [id]);
  },
};
