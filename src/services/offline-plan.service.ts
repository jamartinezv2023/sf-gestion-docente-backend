// src/services/offline-plan.service.ts
import { sqlite } from '../offline/sqlite';

export function saveOfflinePlan(data: any) {
  const stmt = sqlite.prepare(`
    INSERT INTO plans (
      teacher_id,
      docente,
      area,
      grado,
      periodo,
      proposito,
      actividades,
      created_at,
      synced
    ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), 0)
  `);

  const result = stmt.run(
    data.teacher_id,
    data.docente,
    data.area,
    data.grado,
    data.periodo,
    data.proposito,
    data.actividades
  );

  return {
    status: 'OK',
    mode: 'OFFLINE',
    id: result.lastInsertRowid
  };
}
