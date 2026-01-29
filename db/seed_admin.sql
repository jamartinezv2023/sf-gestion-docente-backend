-- Usuario administrador inicial
INSERT INTO users (email, password_hash, role)
VALUES (
  'admin@institucion.edu.co',
  '$2b$10$JtSsRfSsmvXWQboReF2KVON846x0mmJSwL7GorjYCfV6wmoebraq6',
  'ADMIN'
)
ON CONFLICT (email) DO NOTHING;
