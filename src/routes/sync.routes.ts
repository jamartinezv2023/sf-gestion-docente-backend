import { Router } from 'express';
import { syncOfflineController } from '../controllers/sync.controller';

const router = Router();

router.post('/offline', syncOfflineController);

export default router;


