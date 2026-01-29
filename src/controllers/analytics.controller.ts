// src/controllers/analytics.controller.ts
import { Request, Response } from 'express';

export async function analyticsOverviewController(
  req: Request,
  res: Response
) {
  const user = (req as any).user;

  res.json({
    message: 'Analytics protegidos',
    user
  });
}
