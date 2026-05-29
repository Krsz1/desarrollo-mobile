import { Timestamp } from "firebase/firestore";

export const formatDate = (date: Timestamp | string): string => {
  let d: Date;
  if (date instanceof Timestamp) {
    d = date.toDate();
  } else {
    d = new Date(date);
  }
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const timeAgo = (date: Timestamp | string): string => {
  let d: Date;
  if (date instanceof Timestamp) {
    d = date.toDate();
  } else {
    d = new Date(date);
  }
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "hace un momento";
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `hace ${Math.floor(diff / 86400)} días`;
  return formatDate(date);
};

export const getMoodChip = (date: Timestamp | string): { icon: string; label: string } => {
  let d: Date;
  if (date instanceof Timestamp) {
    d = date.toDate();
  } else {
    d = new Date(date);
  }
  const hour = d.getHours();
  if (hour >= 5 && hour < 12) return { icon: "☀️", label: "Mañana" };
  if (hour >= 12 && hour < 17) return { icon: "🌤", label: "Tarde" };
  if (hour >= 17 && hour < 21) return { icon: "🌆", label: "Noche" };
  return { icon: "🌙", label: "Madrugada" };
};
