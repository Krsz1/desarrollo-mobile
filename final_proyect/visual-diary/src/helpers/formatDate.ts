import { Timestamp } from "firebase/firestore";

export const formatDate = (date: Timestamp | string): string => {
  let d: Date;
  if (date instanceof Timestamp) {
    d = date.toDate();
  } else {
    d = new Date(date);
  }
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
