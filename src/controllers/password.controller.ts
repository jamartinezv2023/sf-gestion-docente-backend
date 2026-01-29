import { Response } from "express";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../middlewares/auth.middleware";
import { updatePassword } from "../repositories/user.repository";

export const changePassword = async (req: AuthRequest, res: Response) => {
  const { newPassword } = req.body;

  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({
      message: "La contraseña debe tener al menos 8 caracteres",
    });
  }

  const hash = await bcrypt.hash(newPassword, 10);

  await updatePassword(req.user.id, hash);

  res.json({ message: "Contraseña actualizada correctamente" });
};
