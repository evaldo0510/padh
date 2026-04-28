import { useState, useEffect } from "react";

export type SyncState = "ok" | "pending" | "error" | "blocked";

const SYNC_EVENT = "padh_sync_status_change";
const SYNC_KEY = "padh_last_sync_status";

export const useSyncStatus = () => {
  const [status, setStatus] = useState<SyncState>(() => {
    return (localStorage.getItem(SYNC_KEY) as SyncState) || "ok";
  });

  useEffect(() => {
    const handleSyncChange = () => {
      setStatus((localStorage.getItem(SYNC_KEY) as SyncState) || "ok");
    };

    window.addEventListener(SYNC_EVENT, handleSyncChange);
    return () => window.removeEventListener(SYNC_EVENT, handleSyncChange);
  }, []);

  const updateStatus = (newStatus: SyncState) => {
    localStorage.setItem(SYNC_KEY, newStatus);
    window.dispatchEvent(new Event(SYNC_EVENT));
  };

  return { status, updateStatus };
};

// Global helper to update sync status from anywhere
export const reportSyncStatus = (status: SyncState) => {
  localStorage.setItem(SYNC_KEY, status);
  window.dispatchEvent(new Event(SYNC_EVENT));
};
