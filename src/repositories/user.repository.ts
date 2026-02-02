// src/repositories/user.repository.ts
import { pool } from "../config/db";



export const updatePassword = async (
  userId: number,
  passwordHash: string
) => {
  await pool.query(
    `
    UPDATE users
    SET password_hash = $1,
        must_change_password = false
    WHERE id = $2
    `,
    [passwordHash, userId]
  );
};

export const updateUserPassword = async (id: number, passwordHash: string) => {
  await pool.query(
    `
    UPDATE users
    SET password_hash = $1
    WHERE id = $2
    `,
    [passwordHash, id]
  );
};

export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, email, role, created_at FROM users ORDER BY id`
  );
  return result.rows;
};

export const getUserById = async (id: number) => {
  const result = await pool.query(
    `SELECT id, email, role, created_at FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0] || null;
};

export const createUser = async (
  email: string,
  passwordHash: string,
  role: string
) => {
  const result = await pool.query(
    `
    INSERT INTO users (email, password_hash, role)
    VALUES ($1, $2, $3)
    RETURNING id, email, role, created_at
    `,
    [email, passwordHash, role]
  );
  return result.rows[0];
};

export const updateUserRole = async (id: number, role: string) => {
  const result = await pool.query(
    `
    UPDATE users
    SET role = $1
    WHERE id = $2
    RETURNING id, email, role
    `,
    [role, id]
  );
  return result.rows[0];
};
export const findUserByEmail = async (email: string) => {
  const result = await pool.query(
    `
    SELECT id, email, password_hash, role
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0] || null;
};



export const deleteUser = async (id: number) => {
  await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
};
