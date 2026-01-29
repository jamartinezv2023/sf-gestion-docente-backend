// src/config/database.ts
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config(); // ✅ ANTES de usar process.env

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});
