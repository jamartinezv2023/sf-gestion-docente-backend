-- db/password_resets.sql
-- Tabla para recuperación segura de contraseñas
-- Autor: sf-gestion-docente-backend
-- Fecha: 2026-01-29

CREATE TABLE IF NOT EXISTS password_resets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),

  CONSTRAINT fk_password_resets_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- Índices para seguridad y rendimiento
CREATE INDEX IF NOT EXISTS idx_password_resets_token
  ON password_resets(token);

CREATE INDEX IF NOT EXISTS idx_password_resets_user
  ON password_resets(user_id);