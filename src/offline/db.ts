// --------------------------------------------------
// src/offline/db.ts
// Implementación mínima y robusta de IndexedDB


const DB_NAME = "sf_offline_db";
const DB_VERSION = 1;
const STORE = "queue";


function openDB(): Promise<IDBDatabase> {
return new Promise((resolve, reject) => {
const req = indexedDB.open(DB_NAME, DB_VERSION);


req.onupgradeneeded = () => {
const db = req.result;
if (!db.objectStoreNames.contains(STORE)) {
const store = db.createObjectStore(STORE, {
keyPath: "id",
autoIncrement: true,
});
store.createIndex("status", "status", { unique: false });
store.createIndex("clientTimestamp", "clientTimestamp", { unique: false });
}
};


req.onsuccess = () => resolve(req.result);
req.onerror = () => reject(req.error);
});
}


export async function addOfflineRecord(record: Omit<OfflineRecord, "id">) {
const db = await openDB();
return new Promise<void>((resolve, reject) => {
const tx = db.transaction(STORE, "readwrite");
tx.objectStore(STORE).add(record);
tx.oncomplete = () => resolve();
tx.onerror = () => reject(tx.error);
});
}


export async function getPendingRecords(): Promise<OfflineRecord[]> {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(STORE, "readonly");
const index = tx.objectStore(STORE).index("status");
const req = index.getAll("PENDING");
req.onsuccess = () => resolve(req.result as OfflineRecord[]);
req.onerror = () => reject(req.error);
});
}


export async function markAsSynced(ids: number[]) {
const db = await openDB();
return new Promise<void>((resolve, reject) => {
const tx = db.transaction(STORE, "readwrite");
const store = tx.objectStore(STORE);
ids.forEach(id => {
const getReq = store.get(id);
getReq.onsuccess = () => {
const rec = getReq.result;
if (rec) {
rec.status = "SYNCED";
store.put(rec);
}
};
});
tx.oncomplete = () => resolve();
tx.onerror = () => reject(tx.error);
});
}