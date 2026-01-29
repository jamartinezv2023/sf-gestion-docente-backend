// src/routes/analytics.routes.ts
import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { analyticsOverviewController } from '../controllers/analytics.controller';

const router = Router();

router.get(
  '/overview',
  authenticateJWT,
  analyticsOverviewController
);

export default router;
