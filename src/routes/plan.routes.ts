import { Router } from 'express';
import { createPlanController } from '../controllers/plan.controller';

const router = Router();

router.post('/', createPlanController);

export default router;

