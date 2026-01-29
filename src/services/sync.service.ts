// src/services/sync.service.ts
import { sqlite } from '../offline/sqlite';
import { pool } from '../config/database';

export async function syncOfflinePlans(teacherId: number) {
  const offlinePlans = sqlite
    .prepare('SELECT * FROM plans WHERE synced = 0')
    .all();

  if (offlinePlans.length === 0) {
    return { synced: 0 };
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const plan of offlinePlans) {
      await client.query(
        `
        INSERT INTO plans (
          teacher_id,
          institution_code,
          area,
          grade,
          period,
          academic_year,
          pedagogical_purpose,
          activities,
          created_mode,
          created_at,
          synced_at
        )
        VALUES (
          $1,
          'SF-PALMIRA',
          $2, $3, $4, 2026,
          $5, $6,
          'OFFLINE',
          $7,
          NOW()
        )
        `,
        [
          teacherId,
          plan.area,
          plan.grado,
          plan.periodo,
          plan.proposito,
          plan.actividades,
          plan.created_at
        ]
      );

      sqlite
        .prepare('UPDATE plans SET synced = 1 WHERE id = ?')
        .run(plan.id);
    }

    await client.query(
      `
      INSERT INTO sync_log (teacher_id, total_records, source)
      VALUES ($1, $2, 'OFFLINE_SYNC')
      `,
      [teacherId, offlinePlans.length]
    );

    await client.query('COMMIT');

    return { synced: offlinePlans.length };

  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
