// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, updateUserPassword } from "../repositories/user.repository";
import {
  createPasswordReset,
  findValidToken,
  markTokenAsUsed,
} from "../repositories/passwordReset.repository";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-dev";

/* ================= LOGIN (ya existente) ================= */
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.status(401).json({ message: "Credenciales inválidas" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "8h" }
  );

  res.json({
    token,
    user: { id: user.id, email: user.email, role: user.role },
  });
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    // respuesta neutra (buena práctica de seguridad)
    return res.json({ message: "Si el correo existe, se enviará un enlace" });
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

  await createPasswordReset(user.id, token, expiresAt);

  // 🔐 en producción aquí se envía el correo
  res.json({
    message: "Token de recuperación generado",
    token, // SOLO PARA DESARROLLO
  });
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  const reset = await findValidToken(token);
  if (!reset) {
    return res.status(400).json({ message: "Token inválido o expirado" });
  }

  const hash = await bcrypt.hash(newPassword, 10);

  await updateUserPassword(reset.user_id, hash);
  await markTokenAsUsed(reset.id);

  res.json({ message: "Contraseña actualizada correctamente" });
};