// --------------------------------------------------
// src/offline/connectivity.ts


export function onOnline(callback: () => void) {
window.addEventListener("online", callback);
}


export function onOffline(callback: () => void) {
window.addEventListener("offline", callback);
}


export function isOnline(): boolean {
return navigator.onLine;
}