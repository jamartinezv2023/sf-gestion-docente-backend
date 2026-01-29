-- shared/schema.sql
-- Esquema único OFFLINE-FIRST (Web + Móvil)

CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  docente TEXT NOT NULL,
  area TEXT NOT NULL,
  grado TEXT NOT NULL,
  periodo TEXT NOT NULL,
  proposito TEXT,
  actividades TEXT,
  updated_at INTEGER NOT NULL,
  synced INTEGER DEFAULT 0
);
