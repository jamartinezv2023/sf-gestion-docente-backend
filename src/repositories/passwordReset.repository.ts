// src/repositories/passwordReset.repository.ts
import { pool } from "../config/db";

export const createPasswordReset = async (
  userId: number,
  token: string,
  expiresAt: Date
) => {
  await pool.query(
    `
    INSERT INTO password_resets (user_id, token, expires_at)
    VALUES ($1, $2, $3)
    `,
    [userId, token, expiresAt]
  );
};

export const findValidToken = async (token: string) => {
  const result = await pool.query(
    `
    SELECT * FROM password_resets
    WHERE token = $1
      AND used = FALSE
      AND expires_at > NOW()
    `,
    [token]
  );

  return result.rows[0] || null;
};

export const markTokenAsUsed = async (id: number) => {
  await pool.query(
    `
    UPDATE password_resets
    SET used = TRUE
    WHERE id = $1
    `,
    [id]
  );
};