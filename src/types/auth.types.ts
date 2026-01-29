// src/types/auth.types.ts

import { UserRole } from "../constants/roles";

export interface JwtPayload {
  id: number;
  role: UserRole;
}
