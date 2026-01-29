// src/routes/pdf.routes.ts
import { Router } from 'express';
import { generatePlanAulaPdf } from '../controllers/pdf.controller';

const router = Router();

router.post('/plan-aula', generatePlanAulaPdf);

export default router;
