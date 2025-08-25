import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

let db: SQLiteDatabase;

export const initDb = async () => {
  db = await openDatabaseAsync('app.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      repeatType TEXT, -- once, daily, weekly, monthly
      repeatDays TEXT, -- JSON: [1,2,5] для weekly
      dueDate TEXT     -- ISO-строка для once или monthly
    );
  `);

  return db;
};

export const resetDb = async () => {
  try {
    await FileSystem.deleteAsync(
      `${FileSystem.documentDirectory}SQLite/app.db`,
    );
    console.log('Database deleted');
  } catch (e) {
    console.log('No database to delete', e);
  }
};

export const getDb = () => {
  if (!db) throw new Error('Database is not initialized!');
  console.log('Database is initialized');
  return db;
};
