// src/services/sync-offline.service.ts
import { sqlite } from '../offline/sqlite';
import { pool } from '../config/database';

/**
 * Sincroniza planes creados en modo OFFLINE (SQLite)
 * hacia PostgreSQL (modo ONLINE).
 */
export async function syncOfflinePlans() {
  // 1. Obtener planes offline
  const offlinePlans = sqlite.prepare(`
    SELECT * FROM plans
  `).all();

  if (offlinePlans.length === 0) {
    return {
      status: 'OK',
      message: 'No hay planes offline para sincronizar'
    };
  }

  // 2. Iniciar transacción en PostgreSQL
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const plan of offlinePlans) {
      /**
       * NOTA IMPORTANTE:
       * - teacher_id debe resolverse desde el contexto del usuario autenticado
       * - aquí usamos un valor temporal (1) para pruebas
       */
      await client.query(
        `
        INSERT INTO plans (
          teacher_id,
          grade,
          subject,
          period,
          competencies,
          strategies,
          evidences
        ) VALUES ($1,$2,$3,$4,$5,$6,$7)
        `,
        [
          1, // ← TODO: reemplazar por req.user.id
          plan.grado,
          plan.area,
          plan.periodo,
          plan.proposito,
          plan.actividades,
          'Plan generado en modo offline'
        ]
      );
    }

    await client.query('COMMIT');

    // 3. Limpiar SQLite si todo salió bien
    sqlite.prepare(`DELETE FROM plans`).run();

    return {
      status: 'OK',
      synced: offlinePlans.length,
      message: 'Planes offline sincronizados correctamente'
    };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
