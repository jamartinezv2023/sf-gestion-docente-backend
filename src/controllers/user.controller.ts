// src/controllers/user.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserRole,
  deleteUser,
} from "../repositories/user.repository";

export const listUsers = async (_req: Request, res: Response) => {
  const users = await getAllUsers();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const user = await getUserById(Number(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }
  res.json(user);
};

export const createUserController = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const hash = await bcrypt.hash(password, 10);
  const user = await createUser(email, hash, role || "USER");

  res.status(201).json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const user = await updateUserRole(
    Number(req.params.id),
    req.body.role
  );

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(user);
};

export const deleteUserController = async (req: Request, res: Response) => {
  await deleteUser(Number(req.params.id));
  res.status(204).send();
};
