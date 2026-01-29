// src/routes/offline.routes.ts

import { Router } from "express";
import { syncOffline } from "../controllers/offline.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/sync", authMiddleware, syncOffline);

export default router;
