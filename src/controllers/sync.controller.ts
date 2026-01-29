import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { syncOfflinePlans } from '../services/sync.service';

export async function syncOfflineController(
  req: AuthRequest,
  res: Response
) {
  try {
    const result = await syncOfflinePlans(req.user!.id);
    res.json({ status: 'OK', ...result });
  } catch (error: any) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message
    });
  }
}
