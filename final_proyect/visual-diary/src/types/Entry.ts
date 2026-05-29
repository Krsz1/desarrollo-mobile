import { Timestamp } from "firebase/firestore";

export interface Entry {
  id?: string;
  title: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  address: string;
  createdAt: Timestamp | string;
  userId: string;
}

export type NewEntryData = Omit<Entry, "id" | "createdAt">;
