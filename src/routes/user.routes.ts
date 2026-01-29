import { Router } from "express";
import {
  listUsers,
  getUser,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller";

import { verifyToken } from "../middlewares/auth.middleware";
import { requireRole } from "../middlewares/role.middleware";

const router = Router();

// 🔐 Todas requieren token
router.use(verifyToken);

// 🔐 Solo ADMIN
router.get("/", requireRole(["ADMIN"]), listUsers);
router.get("/:id", requireRole(["ADMIN"]), getUser);
router.post("/", requireRole(["ADMIN"]), createUserController);
router.put("/:id", requireRole(["ADMIN"]), updateUserController);
router.delete("/:id", requireRole(["ADMIN"]), deleteUserController);

export default router;
