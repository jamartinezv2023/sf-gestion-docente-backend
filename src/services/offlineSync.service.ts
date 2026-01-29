// src/services/offlineSync.service.ts
import { AttendanceRepository } from "../repositories/attendance.repository";

const attendanceRepo = new AttendanceRepository();

export class OfflineSyncService {
  async persistAcceptedRecords(
    acceptedRecords: any[],
    userId: number
  ) {
    const results = [];

    for (const record of acceptedRecords) {
      if (record.entity === "attendance") {
        const saved = await attendanceRepo.save({
          studentId: record.data.studentId,
          date: record.data.date,
          status: record.data.status,
          syncedBy: userId
        });

        results.push(saved);
      }
    }

    return results;
  }
}
