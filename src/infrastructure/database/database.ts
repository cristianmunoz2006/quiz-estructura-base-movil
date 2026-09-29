import * as SQLite from 'expo-sqlite';

// Única conexión a SQLite de toda la app
export const db = SQLite.openDatabaseSync('app.db');

// Crea las tablas si no existen (se llama una vez al iniciar la app)
export function initDatabase(): void {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      stock INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS persons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      document TEXT NOT NULL UNIQUE,
      phone TEXT NOT NULL
    );
  `);
}
