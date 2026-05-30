import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "./FirebaseService";
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

// ─── getEntries ──────────────────────────────────────────────────────────────
// One-time fetch of all entries belonging to a user (ordered by date desc)
export const getEntries = async (userId: string): Promise<Entry[]> => {
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Entry, "id">),
  }));
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
        .sort((a, b) => {
          const ta = a.createdAt && typeof (a.createdAt as any).toMillis === "function"
            ? (a.createdAt as any).toMillis()
            : new Date(a.createdAt as string).getTime();
          const tb = b.createdAt && typeof (b.createdAt as any).toMillis === "function"
            ? (b.createdAt as any).toMillis()
            : new Date(b.createdAt as string).getTime();
          return tb - ta;
        });
      callback(entries);
    },
    (error) => {
      console.error("realtimeFeed onSnapshot error:", error);
      callback([]);
    }
  );
};
