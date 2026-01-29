// src/middlewares/requireAdmin.ts
import { Response, NextFunction } from "express";
import { AuthRequest } from "./verifyJWT";

export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({
      message: "Acceso denegado: se requiere rol ADMIN",
    });
  }

  next();
};
