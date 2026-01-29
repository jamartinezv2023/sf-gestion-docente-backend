-- ============================================
-- Base de datos: sf_gestion_docente
-- Esquema inicial de autenticación y usuarios
-- ============================================

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Índice para login
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
