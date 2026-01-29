// src/offline/sqlite-init.ts
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.resolve('data');
const DB_PATH = path.join(DATA_DIR, 'offline.db');

export function initOfflineDatabase() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const db = new Database(DB_PATH);

  db.exec(`
    CREATE TABLE IF NOT EXISTS plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      docente TEXT NOT NULL,
      area TEXT NOT NULL,
      grado TEXT NOT NULL,
      periodo TEXT NOT NULL,
      proposito TEXT,
      actividades TEXT,
      created_at TEXT NOT NULL
    );
  `);

  console.log('🟢 SQLite OFFLINE inicializado correctamente');

  return db;
}
