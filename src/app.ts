// src/app.ts
import "dotenv/config"; // 👈 ESTO VA SIEMPRE PRIMERO

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import passwordRoutes from "./routes/password.routes";



const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);
app.use("/auth", passwordRoutes);

app.get("/", (_req, res) => {
  res.send("🚀 API SF Gestión Docente funcionando");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
