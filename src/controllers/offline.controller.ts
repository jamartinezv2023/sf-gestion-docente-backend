// src/controllers/offline.controller.ts
import { Request, Response } from "express";
import { OfflineSyncService } from "../services/offlineSync.service";

const syncService = new OfflineSyncService();

export const syncOffline = async (req: Request, res: Response) => {
  const user = (req as any).user; // viene del JWT
  const records = req.body.records || [];

  // 🔹 Simulación: aquí ya viene el resultado del PASO F
  const accepted = records.filter((r: any, i: number) => i === 0);

  const saved = await syncService.persistAcceptedRecords(
    accepted,
    user.id
  );

  return res.json({
    message: "Persistencia offline completada",
    saved: saved.length
  });
};
