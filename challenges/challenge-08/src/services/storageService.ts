export interface TrackingEntry {
  lat: number;
  lng: number;
  date: string;
}

export const saveTracking = (tracking: TrackingEntry) => {
  const old: TrackingEntry[] = JSON.parse(localStorage.getItem("tracking") || "[]");
  old.push(tracking);
  localStorage.setItem("tracking", JSON.stringify(old));
};

export const getTrackingHistory = (): TrackingEntry[] => {
  return JSON.parse(localStorage.getItem("tracking") || "[]");
};
