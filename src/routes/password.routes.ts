import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { changePassword } from "../controllers/password.controller";

const router = Router();

router.post("/change-password", verifyToken, changePassword);

export default router;

