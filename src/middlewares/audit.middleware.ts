// src/middlewares/audit.middleware.ts
import { Request, Response, NextFunction } from "express";

export const auditMiddleware = (action: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", () => {
      const auditRecord = {
        action,
        userId: (req as any).user?.id ?? null,
        role: (req as any).user?.role ?? null,
        route: req.originalUrl,
        method: req.method,
        statusCode: res.statusCode,
        ip: req.ip,
        success: res.statusCode < 400,
        timestamp: new Date().toISOString(),
        durationMs: Date.now() - start,
      };

      console.log("📝 AUDIT:", auditRecord);
    });

    next();
  };
};
