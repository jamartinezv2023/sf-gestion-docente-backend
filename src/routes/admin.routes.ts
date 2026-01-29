// src/routes/admin.routes.ts
import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/dashboard",
  authenticateJWT,
  authorizeRoles("ADMIN"),
  (_req, res) => {
    res.json({ message: "Panel administrativo" });
  }
);

export default router;
