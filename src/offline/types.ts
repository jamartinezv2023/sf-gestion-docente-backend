// src/offline/types.ts
export interface OfflineRecord {
id?: number;
entity: string; // e.g. "attendance"
localId: string; // e.g. "tmp-001"
clientTimestamp: string; // ISO string
data: Record<string, any>;
status: "PENDING" | "SYNCED" | "ERROR";
}