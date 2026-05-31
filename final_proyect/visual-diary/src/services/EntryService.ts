import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "./FirebaseService";
import { toTimestampMs } from "../helpers/formatDate";
import { Entry, NewEntryData } from "../types/Entry";

const COLLECTION = "entries";

// ─── addEntry ────────────────────────────────────────────────────────────────
// createdAt is always set server-side; callers never pass it
export const addEntry = async (data: NewEntryData): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

// ─── updateEntry ─────────────────────────────────────────────────────────────
export const updateEntry = async (
  id: string,
  data: Partial<Omit<Entry, "id" | "userId" | "createdAt">>
): Promise<void> => {
  const ref = doc(db, COLLECTION, id);
  await updateDoc(ref, { ...data });
};

// ─── deleteEntry ─────────────────────────────────────────────────────────────
export const deleteEntry = async (id: string): Promise<void> => {
  const ref = doc(db, COLLECTION, id);
  await deleteDoc(ref);
};

// ─── realtimeFeed ────────────────────────────────────────────────────────────
// Real-time listener for ALL users' entries (global community feed)
export const realtimeFeed = (
  callback: (entries: Entry[]) => void
): (() => void) => {
  const q = query(collection(db, COLLECTION));
  return onSnapshot(
    q,
    (snapshot) => {
      const entries: Entry[] = snapshot.docs
        .map((d) => ({ id: d.id, ...(d.data() as Omit<Entry, "id">) }))
        .sort((a, b) => toTimestampMs(b.createdAt) - toTimestampMs(a.createdAt));
      callback(entries);
    },
    (error) => {
      // Don't clear existing entries on network error — keep whatever was loaded
      console.error("realtimeFeed onSnapshot error:", error);
    }
  );
};
