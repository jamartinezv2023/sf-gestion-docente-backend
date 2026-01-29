// --------------------------------------------------
// src/offline/sync.ts
// Worker lógico de sincronización (sin Service Worker aún)


import { getPendingRecords, markAsSynced } from "./db";


export async function syncOfflineQueue(token: string) {
const pending = await getPendingRecords();
if (pending.length === 0) return { sent: 0 };


const res = await fetch("/offline/sync", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${token}`,
},
body: JSON.stringify({ records: pending.map(p => ({
entity: p.entity,
localId: p.localId,
clientTimestamp: p.clientTimestamp,
data: p.data,
})) }),
});


if (!res.ok) throw new Error("Sync failed");


const json = await res.json();


const acceptedCount = json?.summary?.accepted ?? json?.saved ?? 0;
const idsToMark = pending.slice(0, acceptedCount).map(p => p.id!).filter(Boolean);


await markAsSynced(idsToMark);
return { sent: acceptedCount };
}