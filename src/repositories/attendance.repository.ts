// src/repositories/attendance.repository.ts
export interface AttendanceRecord {
  studentId: number;
  date?: string;
  status?: string;
  syncedBy: number;
}

export class AttendanceRepository {
  async save(record: AttendanceRecord) {
    // SIMULACIÓN (luego se conecta a DB real)
    console.log("📦 Guardando asistencia:", record);

    return {
      id: Math.floor(Math.random() * 10000),
      ...record,
      createdAt: new Date()
    };
  }
}
