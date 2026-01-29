// src/middlewares/authorizeRoles.ts
import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !user.role) {
      return res.status(403).json({
        message: "Rol de usuario no disponible",
      });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: "Acceso denegado: permisos insuficientes",
        requiredRoles: allowedRoles,
        yourRole: user.role,
      });
    }

    next();
  };
};
